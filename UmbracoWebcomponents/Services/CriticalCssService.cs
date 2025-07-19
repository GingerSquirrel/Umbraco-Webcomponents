using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Html;

namespace UmbracoWebcomponents.Services
{
    public class CriticalCssService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Dictionary<string, string> _cssCache = new();

        public CriticalCssService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        /// <summary>
        /// Reads CSS from a file and returns it as an HTML style tag for inlining
        /// </summary>
        /// <param name="cssFilePath">Path to CSS file relative to wwwroot (e.g., "css/critical.css")</param>
        /// <param name="useCache">Whether to cache the CSS content (default: true)</param>
        /// <returns>HTML style tag with the CSS content</returns>
        public HtmlString GetInlineCss(string cssFilePath, bool useCache = true)
        {
            try
            {
                // Check cache first if enabled
                if (useCache && _cssCache.ContainsKey(cssFilePath))
                {
                    return new HtmlString($"<style>{_cssCache[cssFilePath]}</style>");
                }

                // Build full path to CSS file
                var fullPath = Path.Combine(_webHostEnvironment.WebRootPath, cssFilePath);
                
                if (!File.Exists(fullPath))
                {
                    return new HtmlString($"<!-- CSS file not found: {cssFilePath} -->");
                }

                // Read CSS content
                var cssContent = File.ReadAllText(fullPath);
                
                // Cache the content if enabled
                if (useCache)
                {
                    _cssCache[cssFilePath] = cssContent;
                }

                return new HtmlString($"<style>{cssContent}</style>");
            }
            catch (Exception ex)
            {
                return new HtmlString($"<!-- Error reading CSS file {cssFilePath}: {ex.Message} -->");
            }
        }

        /// <summary>
        /// Gets critical CSS for FOUC prevention with component names
        /// </summary>
        /// <param name="componentNames">Array of component names (without '-component' suffix)</param>
        /// <returns>HTML style tag with FOUC prevention CSS</returns>
        public HtmlString GetFoucPreventionCss(params string[] componentNames)
        {
            var selectors = componentNames.Select(name => $"{name}-component:not(:defined)").ToArray();
            var css = $"{string.Join(",\n        ", selectors)} {{\n            display: none;\n        }}";
            
            return new HtmlString($"<!-- Critical CSS: FOUC Prevention -->\n    <style>\n        {css}\n    </style>");
        }

        /// <summary>
        /// Clears the CSS cache (useful for development)
        /// </summary>
        public void ClearCache()
        {
            _cssCache.Clear();
        }
    }
}
