const puppeteer = require('puppeteer');
const cron = require('node-cron');
const axios = require('axios');

const DASHBOARD_URL = process.env.DASHBOARD_URL || 'https://bazztech-agentic-team-auto-production-047d.up.railway.app';
const CHECK_INTERVAL = process.env.CHECK_INTERVAL || '*/5 * * * *'; // Every 5 minutes

// Agent details (fixed values)
const AGENT_CONFIG = {
    agentType: 'Enterprise',
    enterpriseCP: 'BAZZTECH NETWORKS',
    agentName: 'Reagan Ochola',
    agentMobile: '254781751937'
};

async function getQualifiedLeads() {
    try {
        const response = await axios.get(`${DASHBOARD_URL}/api/leads/qualified`);
        return response.data.leads || [];
    } catch (error) {
        console.error('Error fetching qualified leads:', error.message);
        return [];
    }
}

async function submitToAirtelForm(lead) {
    console.log(`\n🚀 Submitting lead: ${lead.name} (${lead.phone})`);

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to form
        console.log('📝 Opening Airtel form...');
        await page.goto('https://forms.office.com/r/hcrh2wrJDp', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Page 1: Click "Start now"
        console.log('▶️  Page 1: Clicking Start now...');
        await page.waitForSelector('button', { timeout: 10000 });
        const startButtons = await page.$$('button');
        for (const button of startButtons) {
            const text = await page.evaluate(el => el.textContent, button);
            if (text.includes('Start now')) {
                await button.click();
                break;
            }
        }
        await page.waitForTimeout(3000);

        // Page 2: Fill Agent Details
        console.log('👤 Page 2: Filling agent details...');

        // Agent Type - Find and click the dropdown, then select Enterprise
        const agentTypeSelectors = [
            'select[aria-label*="Agent Type"]',
            'select[title*="Agent Type"]',
            'select:has(option:contains("Enterprise"))'
        ];

        for (const selector of agentTypeSelectors) {
            try {
                await page.waitForSelector(selector, { timeout: 5000 });
                await page.select(selector, 'Enterprise');
                break;
            } catch (e) {
                continue;
            }
        }

        // Enterprise CP
        await page.waitForTimeout(1000);
        const cpSelectors = [
            'select[aria-label*="Enterprise CP"]',
            'select[title*="Enterprise CP"]'
        ];

        for (const selector of cpSelectors) {
            try {
                await page.select(selector, 'BAZZTECH NETWORKS');
                break;
            } catch (e) {
                continue;
            }
        }

        // Agent Name - try multiple selectors
        const nameSelectors = [
            'input[aria-label*="Agent Name"]',
            'input[title*="Agent Name"]',
            'input[placeholder*="Agent Name"]'
        ];

        for (const selector of nameSelectors) {
            try {
                await page.waitForSelector(selector, { timeout: 2000 });
                await page.type(selector, AGENT_CONFIG.agentName);
                break;
            } catch (e) {
                continue;
            }
        }

        // Agent Mobile Number
        const mobileSelectors = [
            'input[aria-label*="Agent Mobile"]',
            'input[title*="Agent Mobile"]'
        ];

        for (const selector of mobileSelectors) {
            try {
                await page.type(selector, AGENT_CONFIG.agentMobile);
                break;
            } catch (e) {
                continue;
            }
        }

        // Click Next
        console.log('➡️  Clicking Next...');
        await page.waitForTimeout(1000);
        const nextButtons = await page.$$('button');
        for (const button of nextButtons) {
            const text = await page.evaluate(el => el.textContent, button);
            if (text.includes('Next')) {
                await button.click();
                break;
            }
        }
        await page.waitForTimeout(3000);

        // Page 3: Fill Customer Details
        console.log('📋 Page 3: Filling customer details...');

        // Type of Lead
        await page.select('select[aria-label*="Type of Lead"]', 'Confirmed');
        await page.waitForTimeout(500);

        // Type of Connection
        await page.select('select[aria-label*="Type of Connection"]', 'SmartConnect(5G ODU)');
        await page.waitForTimeout(500);

        // Customer Name
        await page.type('input[aria-label*="Customer Name"]', lead.name);

        // Customer Phone
        await page.type('input[aria-label*="Customer Phone"]', lead.phone);

        // Alternative Number
        await page.type('input[aria-label*="Alternative Number"]', lead.alternativePhone || lead.phone);

        // Email
        if (lead.email) {
            await page.type('input[aria-label*="Email"]', lead.email);
        }

        // Preferred Package
        const packageValue = lead.preferredPackage === '5G_30Mbps'
            ? '5G _30Mbps_30days at Ksh.3999'
            : '5G _15Mbps_30days at Ksh.2999';
        await page.select('select[aria-label*="Preferred Package"]', packageValue);

        // Installation Town
        await page.select('select[aria-label*="Installation Town"]', lead.installationTown || 'Nairobi');

        // Delivery Location
        await page.type('input[aria-label*="Delivery Location"]', lead.deliveryLocation || 'CBD');

        // Preferred Date
        const installDate = lead.preferredDate
            ? new Date(lead.preferredDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
            : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        await page.type('input[aria-label*="Preferred Date"]', installDate);

        // Preferred Time
        await page.select('select[aria-label*="Preferred Time"]', lead.preferredTime || 'Morning');

        await page.waitForTimeout(2000);

        // Submit
        console.log('✅ Submitting form...');
        const submitButtons = await page.$$('button');
        for (const button of submitButtons) {
            const text = await page.evaluate(el => el.textContent, button);
            if (text.includes('Submit')) {
                await button.click();
                break;
            }
        }

        // Wait for submission confirmation
        await page.waitForTimeout(5000);

        console.log('✅ Form submitted successfully!');

        // Update dashboard
        await updateDashboard(lead.id, true, 'Form submitted successfully');

        return { success: true, leadId: lead.id };

    } catch (error) {
        console.error(`❌ Error submitting form for ${lead.name}:`, error.message);
        await updateDashboard(lead.id, false, error.message);
        return { success: false, leadId: lead.id, error: error.message };
    } finally {
        await browser.close();
    }
}

async function updateDashboard(leadId, success, message) {
    try {
        await axios.post(`${DASHBOARD_URL}/api/webhook`, {
            type: 'SUBMISSION_RESULT',
            data: {
                leadId,
                success,
                response: { message, timestamp: new Date().toISOString() }
            }
        });
        console.log(`📊 Dashboard updated for lead ${leadId}`);
    } catch (error) {
        console.error('Error updating dashboard:', error.message);
    }
}

async function processQualifiedLeads() {
    console.log('\n' + '='.repeat(60));
    console.log('🔄 Checking for qualified leads...');
    console.log('='.repeat(60));

    const leads = await getQualifiedLeads();

    if (leads.length === 0) {
        console.log('📭 No qualified leads found.');
        return;
    }

    console.log(`📬 Found ${leads.length} qualified lead(s)`);

    for (const lead of leads) {
        await submitToAirtelForm(lead);
        // Wait 10 seconds between submissions to avoid rate limiting
        if (leads.indexOf(lead) < leads.length - 1) {
            console.log('⏳ Waiting 10 seconds before next submission...');
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }

    console.log('\n✅ Batch processing complete!');
}

// Main execution wrapper
async function main() {
    try {
        console.log('🚀 Airtel Form Submitter Service Started');
        console.log(`📅 Schedule: ${CHECK_INTERVAL}`);
        console.log(`🌐 Dashboard URL: ${DASHBOARD_URL}`);
        console.log('='.repeat(60));

        // Run immediately on startup
        await processQualifiedLeads();

        // Then run on schedule
        cron.schedule(CHECK_INTERVAL, () => {
            processQualifiedLeads().catch(err => {
                console.error('❌ Scheduled job error:', err);
            });
        });

        console.log('✅ Service running - press Ctrl+C to stop');

    } catch (error) {
        console.error('❌ Fatal error during startup:', error);
        process.exit(1);
    }
}

// Start the service
main().catch(err => {
    console.error('❌ Failed to start service:', err);
    process.exit(1);
});
