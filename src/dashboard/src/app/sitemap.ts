import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bazztech.co.ke'

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/blog',
        '/careers',
        '/case-studies',
        '/case-studies/carton-manufacturer',
        '/faq',
        '/how-it-works',
        '/implementation',
        '/integrations',
        '/pricing',
        '/privacy',
        '/resources',
        '/roadmap',
        '/safety-oversight',
        '/security',
        '/terms',
        '/why-bazzai',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Blog routes
    const blogDirectory = path.join(process.cwd(), 'src/content/blogs')
    let blogRoutes: MetadataRoute.Sitemap = []
    
    try {
        const files = fs.readdirSync(blogDirectory)
        blogRoutes = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const slug = file.replace('.md', '')
                return {
                    url: `${baseUrl}/blog/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                }
            })
    } catch (error) {
        console.error('Error reading blog directory:', error)
    }

    return [...staticRoutes, ...blogRoutes]
}
