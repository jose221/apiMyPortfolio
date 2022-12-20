if( 'function' === typeof importScripts) {   ('https://ue.user.com/static/webpush/ue_sw_config.js') }

//import {registerRoute} from 'workbox-routing';
//registerRoute(new RegExp('styles/.*\\.css'), callbackHandler);
//create the date
var myDate = new Date();
let  version_cache= "cache-"+ myDate.toISOString().split('T')[0];
async function getNameCache(){
    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    let widgets_manifest = await (await fetch('/widgets/widgets_manifest.json')).json();
    version_cache = myDate.toISOString().split('T')[0]+"-"+widgets_manifest.configuration.cacheVersion;
    return version_cache;
}
// Elimina archivos de cache viejos
async function clearCache(cacheWhitelist) {
    let  cacheNames = await caches.keys();
    //let cacheWhitelist = await getNameCache();
    return await Promise.all(
        cacheNames.map(function(cacheName) {
            //console.log(cacheName.includes(cacheWhitelist))
            if (!cacheName.includes(cacheWhitelist)) {
                //console.log(cacheName," limpiado");
                return caches.delete(cacheName);
            }
        })
    );
}

const path_resource = './resources/';
const archiveList = [
    /**"/resources/js/buscador/PT.Booker-min.min.js",
    "/resources/js/buscador/buscador3.min.js",**/
    "/modules/mod_buscador/js/jquery-1.7.1.min.js",
    //"/index.php",
    //"/index.php/component/promociones_tiquetes_aereos/?Itemid=103",
    "/templates/tiquetesbaratos/codigosnacionales.txt"
];
async function cacheJsAndCss(cache)
{
    cache.addAll(archiveList).then(res => res).catch(e=>console.warn("Hubo un error al agregar al cache el archivo "+e+" archivo "));

    let list = await (await fetch('/resources/rev-manifest.json')).json();
    for (const item in list) {
        try {
            if(list[item]){
                const subf = item.substr( (item.lastIndexOf(".")+1 - item.length) );
                const url = `${path_resource+subf}/${list[item]}`;
                await cache.add(url);
            }
        }catch (e){
            console.warn("Hubo un error al agregar al cache el archivo "+e+" archivo "+list[item]);
        }
    }
    return cache;
}
self.addEventListener("install", (event) => {
    event.waitUntil(
         getNameCache().then( async function (name_cache){
             clearCache(version_cache);
             let cache = await caches.open(version_cache);
             return await cacheJsAndCss(cache);
         })
    );
});
// Cache, falling back to network
self.addEventListener('fetch', function(event) {
    let request = event.request;
    //console.log(event.request.cache,  event.request.mode)
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request).then(function (response) {
                caches.open(version_cache+"-templates").then((cache)=> cache.add(request.url)).catch((e)=> console.warn("hubo un error al cachear template"+ e + request.url));
                return response;
            }).catch(function (error) {
                console.warn("no tienes acceso a internet o no encuentra el archivo");
                return caches.match(request).then(function (response) {
                    return response;
                }).catch(function (e){
                    console.warn("hubo un error de solicitud "+ e +" ". request.url);
                });
            })
        );
    }else{
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request).then(function (response) {
                    //if(request.headers.get('Accept').includes('image'))
                    if(request.url.indexOf("/resources/images") >= 0){
                        caches.open(version_cache+"-images").then((cache)=> cache.add(request.url)).catch((e)=> console.warn("hubo un error al cachear "+ e + request.url));
                    }
                    return response;
                }).catch(function (e){
                    console.warn("hubo un error de solicitud "+ e + request.url);
                });
            })
        );
    }
});
const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener("activate", (event) => {
    event.waitUntil(enableNavigationPreload());
});

