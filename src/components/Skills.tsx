"use client";

import SectionHeading from "./SectionHeading";
import SkillConstellation from "./SkillConstellation";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 pb-40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="The stack" title="Skill constellation." tone="violet" align="center" />
      </div>

      <SkillConstellation />
    </section>
  );
}
