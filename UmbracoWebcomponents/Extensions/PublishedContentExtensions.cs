using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;
using UmbracoWebcomponents.Models;
using System.Text.Json;

namespace UmbracoWebcomponents.Extensions
{
    /// <summary>
    /// Extension methods for IPublishedContent to provide easy access to SEO properties
    /// </summary>
    public static class PublishedContentExtensions
    {
        /// <summary>
        /// Helper method to get SEO data from any content that implements ISeo
        /// </summary>
        private static SeoMetaModel? GetSeoDataFromContent(ISeo seoContent)
        {
            if (string.IsNullOrWhiteSpace(seoContent.SeoPreview))
            {
                return new SeoMetaModel();
            }

            try
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                
                return JsonSerializer.Deserialize<SeoMetaModel>(seoContent.SeoPreview, options) ?? new SeoMetaModel();
            }
            catch (JsonException)
            {
                // If JSON is invalid, return empty model
                return new SeoMetaModel();
            }
        }
        /// <summary>
        /// Gets the meta title from the SEO composition if available, otherwise returns the content name
        /// </summary>
        /// <param name="content">The published content</param>
        /// <param name="fallbackToName">Whether to fallback to the content name if no meta title is set</param>
        /// <returns>The meta title or fallback value</returns>
        public static string GetMetaTitle(this IPublishedContent content, bool fallbackToName = true)
        {
            if (content is ISeo seoModel)
            {
                // Get the SEO data using the property value converter
                var seoData = GetSeoDataFromContent(seoModel);
                if (seoData != null && !string.IsNullOrWhiteSpace(seoData.MetaTitle))
                {
                    return seoData.MetaTitle;
                }
            }
            
            return fallbackToName ? (content.Name ?? "") : "";
        }

        /// <summary>
        /// Gets the meta description from the SEO composition if available
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>The meta description or empty string</returns>
        public static string GetMetaDescription(this IPublishedContent content)
        {
            if (content is ISeo seoModel)
            {
                var seoData = GetSeoDataFromContent(seoModel);
                return seoData?.MetaDescription ?? "";
            }
            
            return "";
        }

        /// <summary>
        /// Gets the SEO validation status for the content
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>True if SEO is considered good, false otherwise</returns>
        public static bool HasGoodSeo(this IPublishedContent content)
        {
            if (content is ISeo seoModel)
            {
                var seoData = GetSeoDataFromContent(seoModel);
                if (seoData == null) return false;
                
                var warnings = GetSeoWarningsFromData(seoData);
                return warnings.Count == 0;
            }
            
            return false;
        }

        /// <summary>
        /// Helper method to generate SEO warnings from SeoMetaModel
        /// </summary>
        private static List<string> GetSeoWarningsFromData(SeoMetaModel seoData)
        {
            var warnings = new List<string>();
            
            if (string.IsNullOrWhiteSpace(seoData.MetaTitle))
            {
                warnings.Add("Meta title is missing");
            }
            else if (seoData.MetaTitle.Length < 50)
            {
                warnings.Add("Meta title is too short (less than 50 characters)");
            }
            else if (seoData.MetaTitle.Length > 60)
            {
                warnings.Add("Meta title is too long (more than 60 characters)");
            }
            
            if (string.IsNullOrWhiteSpace(seoData.MetaDescription))
            {
                warnings.Add("Meta description is missing");
            }
            else if (seoData.MetaDescription.Length < 120)
            {
                warnings.Add("Meta description is too short (less than 120 characters)");
            }
            else if (seoData.MetaDescription.Length > 155)
            {
                warnings.Add("Meta description is too long (more than 155 characters)");
            }
            
            return warnings;
        }

        /// <summary>
        /// Gets the SEO warnings for the content
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>List of SEO warnings or empty list</returns>
        public static List<string> GetSeoWarnings(this IPublishedContent content)
        {
            if (content is ISeo seoModel)
            {
                var seoData = GetSeoDataFromContent(seoModel);
                if (seoData != null)
                {
                    return GetSeoWarningsFromData(seoData);
                }
            }
            
            return new List<string>();
        }

        /// <summary>
        /// Gets the SEO status CSS class for styling purposes
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>CSS class representing SEO status</returns>
        public static string GetSeoStatusClass(this IPublishedContent content)
        {
            if (content is ISeo seoModel)
            {
                var seoData = GetSeoDataFromContent(seoModel);
                if (seoData != null)
                {
                    var warnings = GetSeoWarningsFromData(seoData);
                    if (warnings.Count == 0) return "seo-excellent";
                    if (warnings.Count <= 2) return "seo-good";
                    return "seo-poor";
                }
            }
            
            return "seo-unknown";
        }

        /// <summary>
        /// Checks if the content has the SEO composition
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>True if content has SEO composition</returns>
        public static bool HasSeo(this IPublishedContent content)
        {
            return content is ISeo;
        }

        /// <summary>
        /// Gets the extended SEO model if available
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>Extended Seo model or null</returns>
        public static Seo? GetSeoModel(this IPublishedContent content)
        {
            // Only return Seo model if the content is actually a Seo composition instance
            if (content is Seo seoModel)
            {
                return seoModel;
            }
            
            // For Content models that implement ISeo, we can't return a Seo model
            // but we can create a dynamic wrapper if needed
            return null;
        }

        /// <summary>
        /// Gets the raw SEO data model from any content with ISeo composition
        /// </summary>
        /// <param name="content">The published content</param>
        /// <returns>SeoMetaModel with the parsed data or null</returns>
        public static SeoMetaModel? GetSeoData(this IPublishedContent content)
        {
            if (content is ISeo seoModel)
            {
                return GetSeoDataFromContent(seoModel);
            }
            
            return null;
        }
    }
}
