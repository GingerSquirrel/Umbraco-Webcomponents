namespace UmbracoWebcomponents.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomPropertyValueConverters(this IServiceCollection services)
        {
            // Property value converters are automatically discovered by Umbraco
            // No need to register them manually
            return services;
        }
    }
}
