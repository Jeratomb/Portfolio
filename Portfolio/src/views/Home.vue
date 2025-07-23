<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-10 mt-10"
  >
    <div class="flex flex-col items-center gap-6">
      <div class="flex gap-4 flex-wrap justify-center">
        <img
          src="/src/assets/test.png"
          alt="Profile"
          class="w-32 h-32 rounded-full shadow-lg"
        />
        <img
          src="/src/assets/test.png"
          alt="Icon"
          class="w-20 h-20 rounded shadow"
        />
        <img
          src="/src/assets/test.png"
          alt="Logo Asset"
          class="w-24 h-24 rounded shadow"
        />
        <img
          src="/src/assets/test.png"
          alt="Placeholder"
          class="w-20 h-20 rounded shadow"
        />
      </div>
      <h1 class="text-3xl font-bold">🏡 Startseite</h1>
      <p class="max-w-xl text-center text-lg text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        nunc ut laoreet cursus, enim erat dictum urna, nec dictum velit enim
        euismod enim. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Etiam euismod, nunc ut laoreet
        cursus, enim erat dictum urna, nec dictum velit enim euismod enim.
      </p>
    </div>
    <div
      id="next-content"
      class="opacity-0 transition-opacity duration-1000 mt-20"
    >
      <h2 class="text-2xl font-semibold mb-4">Weitere Inhalte</h2>
      <p class="max-w-xl text-center text-gray-400">
        Hier erscheint weiterer Text, sobald du nach unten scrollst.
      </p>
    </div>

    <div class="flex flex-col items-center gap-20 mt-20">
      <div
        id="about-section"
        class="opacity-0 transition-opacity duration-1000"
      >
        <h2 class="text-2xl font-semibold mb-4">👤 About Me</h2>
        <p class="max-w-xl text-center text-gray-400 mb-8">
          I'm a full-stack developer passionate about clean code and great UX.
        </p>
      </div>

      <div
        id="projects-section"
        class="opacity-0 transition-opacity duration-1000"
      >
        <h2 class="text-2xl font-semibold mb-4">💻 Projects</h2>
        <p class="max-w-xl text-center text-gray-400 mb-8">
          A showcase of my latest work.
        </p>
      </div>

      <div
        id="contact-section"
        class="opacity-0 transition-opacity duration-1000"
      >
        <h2 class="text-2xl font-semibold mb-4">📬 Contact</h2>
        <p class="max-w-xl text-center text-gray-400 mb-8">
          Feel free to reach out via email or LinkedIn.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  const nextContent = document.getElementById("next-content");
  const contentBlocks = [
    document.getElementById("about-section"),
    document.getElementById("projects-section"),
    document.getElementById("contact-section"),
  ].filter(Boolean);

  const handleScroll = () => {
    if (nextContent) {
      const rect = nextContent.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        nextContent.classList.add("opacity-100");
      } else {
        nextContent.classList.remove("opacity-100");
      }
    }

    contentBlocks.forEach((block) => {
      const rect = block.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        block.classList.add("opacity-100");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>
