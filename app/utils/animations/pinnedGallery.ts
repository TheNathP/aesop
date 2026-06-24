import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PinnedGalleryElements {
  section: HTMLElement
  images: HTMLElement[]
}

/**
 * Initialise l'animation ScrollTrigger pour la galerie épinglée.
 *
 * Utilise une timeline unique contrôlée par un seul ScrollTrigger
 * pour synchroniser le pin de la colonne gauche et les crossfades
 * d'opacité entre les images.
 *
 * Retourne un contexte GSAP à révoquer au démontage du composant.
 */
export function createPinnedGalleryAnimation(
  elements: PinnedGalleryElements
): gsap.Context {
  const ctx = gsap.context(() => {
    const { section, images } = elements

    const img1 = images[0]
    const img2 = images[1]
    const img3 = images[2]

    if (!img1 || !img2 || !img3) return

    // Pin de la colonne gauche indépendamment de la timeline
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: '.pinned-gallery__left',
      pinSpacing: false,
    })

    // États initiaux
    gsap.set(img1, { opacity: 1 })
    gsap.set([img2, img3], { opacity: 0 })

    // Timeline unique — chaque segment représente un crossfade
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
    })

    // Segment 1 : image 1 → image 2
    tl.to(img1, { opacity: 0, duration: 1, ease: 'power1.inOut' }, 0)
      .to(img2, { opacity: 1, duration: 1, ease: 'power1.inOut' }, 0)

    // Pause visuelle — image 2 reste visible
      .to({}, { duration: 0.5 })

    // Segment 2 : image 2 → image 3
      .to(img2, { opacity: 0, duration: 1, ease: 'power1.inOut' })
      .to(img3, { opacity: 1, duration: 1, ease: 'power1.inOut' }, '<')
  }, elements.section)

  return ctx
}
