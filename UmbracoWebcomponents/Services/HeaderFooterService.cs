using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace UmbracoWebcomponents.Services
{
    public class HeaderFooterService
    {
        private readonly IUmbracoContextFactory _contextFactory;

        public HeaderFooterService(IUmbracoContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public Webroot? GetRootNode()
        {
            using var contextReference = _contextFactory.EnsureUmbracoContext();
            // Get the first root node (usually the website root)
            var rootNode = contextReference.UmbracoContext.Content?.GetAtRoot().FirstOrDefault();
            if (rootNode != null && rootNode.ContentType.Alias == Webroot.ModelTypeAlias)
            {
                return rootNode as Webroot;
            }
            else
            {
                return null;
            }
        }

        public BlockListModel? GetHeader()
        {
            using var contextReference = _contextFactory.EnsureUmbracoContext();
            Webroot rootNode = GetRootNode();
            if (rootNode == null || rootNode.Header == null)
            {
                return null;
            }
            return rootNode.Header;
            
        }
    }
}
