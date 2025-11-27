# Test Lead Qualification Workflow
# Replace WEBHOOK_URL with your actual n8n webhook URL after activation

$webhookUrl = "REPLACE_WITH_YOUR_N8N_WEBHOOK_URL"  # e.g., https://bazztech-n8n.up.railway.app/webhook/qualify-lead

$testLead = @{
    data = @{
        id = "test-lead-123"
        name = "John Kimani"
        phone = "+254712345678"
        email = "john@techcorp.co.ke"
        deliveryLocation = "CEO at TechCorp Kenya"
        installationTown = "Nairobi"
        tags = "APIFY, LINKEDIN, CEO"
        preferredPackage = "5G_30Mbps"
    }
} | ConvertTo-Json -Depth 3

Write-Host "Sending test lead to qualification workflow..." -ForegroundColor Cyan
Write-Host "URL: $webhookUrl" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $testLead -ContentType "application/json"
    Write-Host "`nSuccess!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "`nError:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
