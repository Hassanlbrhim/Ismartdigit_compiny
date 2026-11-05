import { Smartphone, Globe, PenTool, Layers, TrendingUp, Cog, Cpu, Code, Database, Cloud, Shield, Rocket, Brain, Palette, BarChart3, Headphones, Lightbulb, Zap, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// Icons selectable from the admin (kept explicit so the bundle stays small).
export const ICONS = { Smartphone, Globe, PenTool, Layers, TrendingUp, Cog, Cpu, Code, Database, Cloud, Shield, Rocket, Brain, Palette, BarChart3, Headphones, Lightbulb, Zap };
export const SOCIAL_ICONS = { Facebook, Instagram, Linkedin, Twitter };
export type IconName = keyof typeof ICONS;
