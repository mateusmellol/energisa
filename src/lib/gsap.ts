import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Centralize GSAP plugin registration so components can import a stable setup.
gsap.registerPlugin(Flip, ScrollTrigger, ExpoScaleEase);

export { gsap, useGSAP, ExpoScaleEase, Flip, ScrollTrigger };
