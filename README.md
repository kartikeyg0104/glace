# Jairam Sweets

A React + Vite recreation of every visible section of the supplied `Video-68369.mp4`, adapted to Jairam Sweets in Rewari.

Run `npm run dev` for the preview and `npm run build` for production.

The page follows the video's sequence:

1. Gold opening transition, Diwali gift-box hero, box reveal and floating sweets.
2. Scrolling trust strip.
3. Six-part pinned mithai counter: Kaju Katli, Motichoor Ladoo, Jalebi, Gulab Jamun, Rasmalai, Soan Papdi. Product thumbnails, ingredient bursts and scroll transitions.
4. Rotating overhead jalebi-making scene, followed by the full-screen silver/ghee/handmade statement.
5. Nine-piece gift builder with quantities, surprise mix, removal, estimated total, animated sealing/unsealing, selection copying and reset.
6. Shagun Box, Lakshmi Hamper and Royal Thaal gift cards.
7. Filterable price list.
8. Storefront visit section and oversized Hindi मिठास lettering.

GSAP and Lenis synchronize scrolling. Reduced-motion preferences disable the pinned animations while keeping all sections and product selectors usable.

Artwork is generated to match the reference's visual direction, rather than extracted from the filmed screen. Optimized transparent WebP files are in `public/images/mithai/`. [Generation prompts](docs/mithai-artwork.md) record the artwork inputs. The gold gift box, jalebi pan, hamper and golden ghee imagery are generated illustrations.

The shop photograph is `public/images/jairam-shop.jpg`, credited in the existing Maps gallery to Dinesh Singh, September 2025. Existing Jairam address, telephone and Maps link are retained. Prices, gift packages and ingredient descriptions reproduce the reference design and are not verified Jairam offerings. Small notes beside pricing direct customers to the shop for current details. The box builder is a wishlist and does not submit orders.
