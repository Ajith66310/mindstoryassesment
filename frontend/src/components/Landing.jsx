import React from "react";
import styles from "./landing.module.css";
import images from "../assets/assest.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

import { useEffect } from "react";

const Landing = ({ onAnimationComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 6500);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      function createSplitTexts(elements) {
        const splits = {};
        elements.forEach(({ key, selector, type }) => {
          const config = { type, mask: type };
          if (type === "chars") config.charsClass = styles.landingChar;
          if (type === "lines") config.linesClass = styles.landingLine;
          splits[key] = new SplitText(selector, config);
        });
        return splits;
      }

      const splitElements = [
        { key: "logoChars", selector: `.${styles.landingPreloaderLogo} h1`, type: "chars" },
        { key: "footerLines", selector: `.${styles.landingPreloaderFooter} p`, type: "lines" },
        { key: "headerChars", selector: `.${styles.landingHeader} h1`, type: "chars" },
        { key: "headerFooterH3", selector: `.${styles.landingHeroFooter} h3`, type: "lines" },
        { key: "heroFooterP", selector: `.${styles.landingHeroFooter} p`, type: "lines" },
        { key: "btnLabels", selector: `.${styles.landingBtnLabel} span`, type: "lines" },
      ];

      const splits = createSplitTexts(splitElements);

      gsap.set(splits.logoChars.chars, { x: "100%" });
      gsap.set(
        [
          splits.footerLines.lines,
          splits.headerChars.chars,
          splits.headerFooterH3.lines,
          splits.heroFooterP.lines,
          splits.btnLabels.lines,
        ],
        { y: "100%" }
      );

      gsap.set(`.${styles.landingBtnIcon}`, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(`.${styles.landingBtn}`, { scale: 0 });
      gsap.set(`.${styles.landingPreloaderProgressBar}`, { scaleX: 0, transformOrigin: "left" });

      function animateProgress(duration = 4) {
        const progressTl = gsap.timeline();
        const counterSteps = 5;
        let currentProgress = 0;

        for (let i = 0; i < counterSteps; i++) {
          const finalStep = i === counterSteps - 1;
          const targetProgress = finalStep
            ? 1
            : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
          currentProgress = targetProgress;

          progressTl.to(`.${styles.landingPreloaderProgressBar}`, {
            scaleX: targetProgress,
            duration: duration / counterSteps,
            ease: "power2.inOut",
          });
        }
        return progressTl;
      }

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(splits.logoChars.chars, { x: "0%", stagger: 0.05, duration: 1, ease: "power4.inOut" })
        .to(splits.footerLines.lines, { y: "0%", stagger: 0.1, duration: 1, ease: "power4.inOut" }, "0.25")
        .add(animateProgress(), "<")
        .set(`.${styles.landingPreloaderProgress}`, { backgroundColor: "#f5f5f5" })
        .to(splits.logoChars.chars, { x: "-100%", stagger: 0.05, duration: 1, ease: "power4.inOut" }, "-=0.5")
        .to(splits.footerLines.lines, { y: "-100%", stagger: 0.1, duration: 1, ease: "power4.inOut" }, "<")
        .to(`.${styles.landingPreloaderProgress}`, { opacity: 0, duration: 0.5, ease: "power3.inOut" }, "-=0.25")
        .to(`.${styles.landingPreloaderMask}`, { scale: 5, duration: 2.5, ease: "power3.out" }, "<")
        .to(`.${styles.landingHeroImg}`, { scale: 1, duration: 1.5, ease: "power3.out" }, "<")
        .to(splits.headerChars.chars, { y: 0, stagger: 0.05, duration: 1, ease: "power4.out" }, "-=2")
        .to([splits.headerFooterH3.lines, splits.heroFooterP.lines], { y: 0, stagger: 0.1, duration: 1, ease: "power4.out" }, "-=1.5")
        .to(
          `.${styles.landingBtn}`,
          {
            scale: 1,
            duration: 1,
            ease: "power4.out",
            onStart: () => {
              gsap.to(`.${styles.landingBtnIcon}`, { clipPath: "circle(100% at 50% 50%)", duration: 1, ease: "power2.out" });
              gsap.to(splits.btnLabels.lines, { y: 0, duration: 1, ease: "power4.out" });
            },
          },
          "<"
        );
    });
  }, []);

  return (
    <div className="landing-container">
      <div className={styles.landing}>
        <div className={styles.landingPreloaderProgress}>
          <div className={styles.landingPreloaderProgressBar}></div>
          <div className={styles.landingPreloaderLogo}><h1>FLOWYY</h1></div>
        </div>

        <div className={styles.landingPreloaderMask}></div>

        <div className={styles.landingPreloaderContent}>
          <div className={styles.landingPreloaderFooter}>
            <p>In the stillness of purpose, the greatest works are born.</p>
          </div>
        </div>

        <div className="landingContainer">
          <section className={styles.landingHero}>
            <div className={styles.landingHeroInner}>
              <div className={styles.landingHeroImg}>
                <img src={images.heroimg} alt="" className={styles.landingImg} />
              </div>

              <div className={styles.landingHeroContent}>
                <div className={styles.landingHeader}>
                  <h1>FLOWYY</h1>
                </div>

                <div className={styles.landingContactBtn}>
                  <div className={styles.landingBtn}>
                    <div className={styles.landingBtnLabel}><span>Contact</span></div>
                    <div className={styles.landingBtnIcon}><ion-icon name="arrow-forward-sharp"></ion-icon></div>
                  </div>
                </div>

                <div className={styles.landingMenuBtn}>
                  <div className={styles.landingBtn}>
                    <div className={styles.landingBtnLabel}><span>Menu</span></div>
                    <div className={styles.landingBtnIcon}><ion-icon name="menu-sharp"></ion-icon></div>
                  </div>
                </div>

                <div className={styles.landingHeroFooter}>
                  <h3>Stop Chasing,<br />Start Flowing..</h3>
                  <p>Flowyy powers your storefront with seamless inventory and checkout flows—removing the hurdles between your products and your customers’ doorsteps.</p>              </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Landing;
