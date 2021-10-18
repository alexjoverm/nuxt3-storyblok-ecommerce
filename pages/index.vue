<template>
  <div>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <article
        class="shadow rounded overflow-hidden"
        v-for="product in products.stories"
        :key="product._uid"
        :blok="product"
        v-editable="product"
      >
        <div>
          <img class="w-full" :src="product.content.image.filename" alt="" />
        </div>
        <div class="text-gray-800 p-4">
          <h4 class="font-bold text-xl">{{ product.content.name }}</h4>
          <p class="mt-2">{{ product.content.description }}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: products } = await useFetch(`/cdn/stories`, {
  baseURL: config.apiURL,
  params: {
    version: "draft",
    starts_with: "products/",
    content_type: "Product",
    token: config.apiToken,
  },
});

products.value.stories.forEach(
  (story) =>
    (story.content.image.filename = story.content.image.filename.replace(
      "https://a.storyblok.com/",
      "https://img2.storyblok.com/400x220/"
    ))
);
</script>
