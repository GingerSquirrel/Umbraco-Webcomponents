using System.Text.Json;
using UmbracoWebcomponents.Models;

namespace Umbraco.Cms.Web.Common.PublishedModels
{
    // Partial class extension for the generated Seo model
    public partial class Seo
    {
        private SeoMetaModel? _seoMetaCache;

        /// <summary>
        /// Gets the strongly typed SEO meta data from the SeoPreview property
        /// </summary>
        public SeoMetaModel SeoMeta
        {
            get
            {
                if (_seoMetaCache != null)
                    return _seoMetaCache;

                if (string.IsNullOrWhiteSpace(SeoPreview))
                {
                    _seoMetaCache = new SeoMetaModel();
                    return _seoMetaCache;
                }

                try
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    
                    _seoMetaCache = JsonSerializer.Deserialize<SeoMetaModel>(SeoPreview, options) ?? new SeoMetaModel();
                }
                catch (JsonException)
                {
                    // If JSON is invalid, return empty model
                    _seoMetaCache = new SeoMetaModel();
                }

                return _seoMetaCache;
            }
        }

        /// <summary>
        /// Gets the meta title, returns the set value or empty string if not set
        /// </summary>
        public string MetaTitle => SeoMeta.MetaTitle ?? "";

        /// <summary>
        /// Gets the meta description
        /// </summary>
        public string MetaDescription => SeoMeta.MetaDescription ?? "";

        /// <summary>
        /// Checks if the meta title is within the recommended length (50-60 characters)
        /// </summary>
        public bool IsMetaTitleOptimal => MetaTitle.Length >= 50 && MetaTitle.Length <= 60;

        /// <summary>
        /// Checks if the meta description is within the recommended length (120-155 characters)
        /// </summary>
        public bool IsMetaDescriptionOptimal => MetaDescription.Length >= 120 && MetaDescription.Length <= 155;

        /// <summary>
        /// Gets SEO validation warnings
        /// </summary>
        public List<string> SeoWarnings
        {
            get
            {
                var warnings = new List<string>();

                if (string.IsNullOrWhiteSpace(SeoMeta.MetaTitle))
                    warnings.Add("Meta title is missing");
                else if (SeoMeta.MetaTitle.Length > 60)
                    warnings.Add($"Meta title is too long ({SeoMeta.MetaTitle.Length} characters, recommended: 50-60)");
                else if (SeoMeta.MetaTitle.Length < 50)
                    warnings.Add($"Meta title might be too short ({SeoMeta.MetaTitle.Length} characters, recommended: 50-60)");

                if (string.IsNullOrWhiteSpace(SeoMeta.MetaDescription))
                    warnings.Add("Meta description is missing");
                else if (SeoMeta.MetaDescription.Length > 155)
                    warnings.Add($"Meta description is too long ({SeoMeta.MetaDescription.Length} characters, recommended: 120-155)");
                else if (SeoMeta.MetaDescription.Length < 120)
                    warnings.Add($"Meta description might be too short ({SeoMeta.MetaDescription.Length} characters, recommended: 120-155)");

                return warnings;
            }
        }

        /// <summary>
        /// Checks if the SEO configuration is considered good
        /// </summary>
        public bool HasGoodSeo => SeoWarnings.Count == 0;
    }
}
