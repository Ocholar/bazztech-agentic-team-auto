"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ApiDocs() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
                
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-32">
                        <div className="font-black text-slate-800 mb-4 px-3 uppercase tracking-widest text-xs">BazzAI API V1</div>
                        <nav className="space-y-1">
                            <a href="#authentication" className="block px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-xl transition-colors">Authentication</a>
                            <a href="#endpoints" className="block px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-xl transition-colors">Endpoints</a>
                            <a href="#leads" className="block px-3 py-2 pl-7 text-[13px] font-medium text-slate-500 hover:text-red-600">POST /v1/leads</a>
                            <a href="#workflows" className="block px-3 py-2 pl-7 text-[13px] font-medium text-slate-500 hover:text-red-600">POST /v1/workflows</a>
                            <a href="#webhooks" className="block px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-xl transition-colors">Webhooks</a>
                            <a href="#errors" className="block px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-xl transition-colors">Rate Limits & Errors</a>
                        </nav>
                    </div>
                </aside>
                
                <article className="flex-1 bg-white p-8 md:p-12 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 font-black text-slate-600 uppercase tracking-widest text-[10px] mb-6">
                        Developer Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">API Reference</h1>
                    <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                        BazzAI provides a modern RESTful API to integrate enterprise workflows programmatically. The API responds with standard JSON, uses Bearer token authentication, and provides secure webhooks for asynchronous operations.
                    </p>
                    
                    <h2 id="authentication" className="text-2xl font-black mt-16 mb-4 pb-4 border-b border-slate-100">Authentication</h2>
                    <p className="mb-6 text-slate-600 font-medium">All API requests require an API key passed in the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-red-600 font-mono">Authorization</code> header. You can generate production keys in your dashboard settings.</p>
                    <div className="bg-slate-900 text-slate-50 p-5 rounded-2xl text-sm font-mono overflow-x-auto mb-8 shadow-inner border border-slate-800">
{`Authorization: Bearer bazi_live_7x89ab1cd23`}
                    </div>

                    <h2 id="endpoints" className="text-2xl font-black mt-16 mb-4 pb-4 border-b border-slate-100">Endpoints</h2>
                    
                    <h3 id="leads" className="text-xl font-bold mt-8 mb-2">Create Lead</h3>
                    <p className="mb-5 text-slate-600 font-medium">Creates a new lead object and immediately enqueues it in the active Bazz-Lead validation and scoring pipeline.</p>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">Request Example</div>
                        <div className="p-5 text-sm font-mono text-slate-50 overflow-x-auto overflow-y-hidden">
{`curl -X POST https://api.bazzai.com/v1/leads \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "cto@enterprise.com",
    "name": "Jane Smith",
    "metadata": {"source": "api_integration"}
  }'`}
                        </div>
                    </div>

                    <h3 id="workflows" className="text-xl font-bold mt-12 mb-2">Trigger Workflow</h3>
                    <p className="mb-5 text-slate-600 font-medium">Manually force-trigger a specific n8n workflow deployment by its ID.</p>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">Request Example</div>
                        <div className="p-5 text-sm font-mono text-slate-50 overflow-x-auto overflow-y-hidden">
{`curl -X POST https://api.bazzai.com/v1/workflows/wkf_98h23/trigger \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payload": {
      "invoice_id": "INV-4042"
    }
  }'`}
                        </div>
                    </div>

                    <h2 id="webhooks" className="text-2xl font-black mt-16 mb-4 pb-4 border-b border-slate-100">Webhooks</h2>
                    <p className="mb-5 text-slate-600 font-medium">BazzAI pushes POST requests to your infrastructure when workflows finish executing, preventing the need to poll.</p>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">Payload Example</div>
                        <div className="p-5 text-sm font-mono text-green-400 overflow-x-auto overflow-y-hidden">
{`{
  "event": "workflow.completed",
  "workflow_id": "bazz_doc_88",
  "status": "success",
  "data": {
     "extracted_total": 4500.00,
     "confidence_score": 0.99
  }
}`}
                        </div>
                    </div>
                </article>
            </div>
            <Footer />
        </main>
    );
}
