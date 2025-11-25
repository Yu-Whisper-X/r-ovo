// 缓存版本（黑色主题专用）
const CACHE_NAME = 'raven-black-theme-v1';
// 缓存资源（包含在线图标）
const CACHE_ASSETS = [
  'index.html',
  '10.20',
  'https://tc-new.z.wiki/autoupload/f/fRcoPlzpthEzwh0RrI62JbKXl_QqVl-bpSwqP4fJO68/20250825/5nvZ/1280X1280/3d8950a849829447f24466a851153f8f.jpg/webp'
];

// 安装：缓存黑色主题资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求：优先用缓存（离线也能显示黑色主题）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});