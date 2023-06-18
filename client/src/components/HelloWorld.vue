<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>  
    <div class="wrapper">
      <header class="__header">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nostrum harum, officia ad dolores excepturi voluptatum non nisi cupiditate consequuntur veritatis dicta vitae facilis nemo fuga accusantium sunt, omnis molestiae.
      Unde incidunt dicta ratione illo. Quos perferendis, sit aliquid sed dolorem, consequuntur et repellendus voluptatum dolorum reiciendis doloremque, aliquam inventore nobis veniam! Blanditiis libero perspiciatis laudantium molestias excepturi debitis dolorum.
      Magni culpa voluptas rerum autem pariatur, numquam amet ad dolor perferendis ut, eius quae veniam repellat maiores provident quidem recusandae laborum qui ipsam facilis consequuntur fugit dicta? Iusto, dicta quos?
      Minima vero repudiandae provident quasi hic temporibus similique nisi facilis, unde cumque commodi dolorum, adipisci qui corrupti? Mollitia unde, molestiae nam eum iure nulla tempora minus. Aut consequuntur unde pariatur!
      Numquam asperiores fugit hic magni voluptates, excepturi accusamus ea magnam libero sint praesentium rem aliquid esse saepe id soluta, laboriosam enim deleniti unde consequuntur architecto reprehenderit eveniet? Pariatur, inventore asperiores.</header>
      <main>
        <div class="__container">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia corporis beatae, animi tenetur eos sit doloribus repudiandae dolorum ullam cupiditate pariatur in. Doloremque repudiandae numquam voluptate qui corporis facere provident!</div>
      </main>      
      <aside class="__sidebar">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, asperiores! Eos sint ea officiis! Quisquam voluptas eveniet natus unde suscipit qui accusantium magnam, repellendus itaque dolor, doloribus quibusdam laudantium dolorem?</aside>
      <footer class="__footer">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur atque, a fugit rerum iusto ad quis quae commodi quo aliquid dolorem possimus ab autem sint minima, quia esse suscipit ipsum?
      Fugit veniam voluptates perferendis ab quos suscipit sequi iste, distinctio nihil beatae et! Laborum, autem odio consequatur similique vel, at ab assumenda provident cum, a natus tenetur perferendis incidunt hic.</footer>
    </div>
    <!-- <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div> -->
</template>

<style scoped>

.wrapper {
  /* display: grid;
    grid-template-areas: 
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-rows: 8rem 1fr;
    grid-template-columns: 1fr 5fr; */ 
    display: flex;
    flex-direction: column;
    min-height: 100vh;

}

@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;

  }
}

.__header {
  background-color: rgb(179, 199, 192);
  grid-area: header;
  max-width: min(100vw, 65ch);
}
.__container {
  background-color: rgb(255, 150, 127);
  grid-area: main;
}
.__sidebar {
  background-color: rgb(178, 121, 231);
  grid-area: sidebar;
}
.__footer {
  background-color: rgb(158, 116, 136);
  grid-area: footer;
  width: max-content;
}
.read-the-docs {
  color: #888;
}




</style>
