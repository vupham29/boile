import GSAP from "gsap";
import Utils from "./Utils";

export default class Page extends Utils {
  constructor({ element, elements, id }) {
    super({ element, elements });

    // generate id
    this.id = id;
  }

  /**
   * Animations.
   */
  show(animation) {
    return new Promise((resolve) => {
      // custom animation
      if (animation) {
        this.animation = animation;
      } else {
        this.animation = GSAP.timeline();
        this.animation.fromTo(
          this.element,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
          },
        );
      }

      // call at the end of timeline
      this.animation.call(() => {
        this.addEventListeners();

        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  /**
   * Resize
   */
  resize() {}

  /**
   * Event listeners
   */
  addEventListeners() {}
  removeEventListeners() {}

  /**
   * Destroy when navigating between each page.
   */
  destroy() {
    // remove event listeners
    this.removeEventListeners();
  }
}
