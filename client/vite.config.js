// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })
















// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),

//     VitePWA({
//       registerType: "autoUpdate",

//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) => request.destination === "image",
//             handler: "CacheFirst",

//             options: {
//               cacheName: "image-cache",

//               expiration: {
//                 maxEntries: 200,
//                 maxAgeSeconds: 60 * 60 * 24 * 30
//               }
//             }
//           }
//         ]
//       }

//     })

//   ]
// })

























import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "DesiBazar",
        short_name: "DesiBazar",
        description: "Online Grocery Store",
        theme_color: "#16a34a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",

            options: {
              cacheName: "image-cache",

              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }

    })

  ]
})