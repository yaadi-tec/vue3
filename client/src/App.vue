<template>  
    <div class="wrapper">
      <header class="__header">Lorem ipsum illo. voluptates, excepturi accusamus ea magnam libero sint praesentium rem aliquid esse saepe id soluta, laboriosam enim deleniti unde consequuntur architecto reprehenderit eveniet? Pariatur, inventore asperiores.</header>
      <main>
        <div class="__container">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laborum mollitia id dolores, molestias pariatur aut, dolore commodi error dolorum reprehenderit quis ipsam facere necessitatibus repellendus quaerat officiis et culpa.
        Sit unde repellat nihil adipisci beatae tenetur tempora? Ipsam aliquid deserunt rerum dolor quasi, excepturi ducimus! Alias asperiores animi minima inventore necessitatibus voluptatum mollitia. Dicta reiciendis impedit illum odit maiores.
        Reprehenderit excepturi qui saepe error asperiores quidem vitae a doloremque officia! Ducimus voluptatibus quasi rem possimus minima odio quas at, ipsam laboriosam libero sunt nisi tempora, consequatur pariatur. Corporis, assumenda!
        Iusto ab soluta minima inventore natus obcaecati voluptatum cumque exercitationem eveniet, deserunt ad magnam voluptas explicabo perferendis ipsa amet quasi praesentium esse? Illo eius vel voluptatem saepe perspiciatis dolorum ratione.
        Consequuntur maxime ullam, doloribus possimus est ex quisquam aspernatur tempore quasi culpa cum aliquam quas nesciunt ut nisi inventore quae aut cupiditate provident nam. Quis maxime aut possimus ab adipisci!
        Doloribus repellat unde voluptatem, porro quos nisi eum excepturi reiciendis. Distinctio, quisquam. Non dolorem mollitia facere dignissimos deleniti ab accusamus maiores provident, culpa delectus magnam laudantium quisquam reprehenderit enim. Facere!
        Dolores tempore ullam quidem quod itaque quis praesentium obcaecati nihil doloribus et voluptate consectetur vero, ipsum a repudiandae tempora excepturi sit ea vel dolor recusandae aliquid reiciendis eveniet expedita. Laboriosam.
        Eos iste aperiam omnis voluptates neque distinctio similique, totam vel nobis rem fugiat architecto a error veritatis! Placeat, itaque expedita tenetur suscipit, magnam in fugiat minus explicabo provident, repudiandae reiciendis?
        Repellendus et aliquam ratione rerum at! Tempora quo deserunt distinctio ad hic dicta sint dolorem debitis tenetur error facere non aliquam repellat saepe vitae corporis, consectetur eveniet explicabo, odit a?
        Pariatur dolorem fuga, molestiae nihil ea amet neque consectetur qui vel aspernatur adipisci vitae voluptates quo et labore ipsa est aliquam, modi provident illum culpa soluta accusamus. Soluta, doloremque totam?</div>
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

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style scoped>

.wrapper {
    display: grid;
    grid-template-areas: 
      "header header"
      "sidebar main"
      "footer footer";
    /* grid-template-rows: 8rem 1fr; */
    grid-template-columns: 1fr 5fr;    
}

@media (min-width: 768px) {
  .wrapper {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
  }
}

.__header {
  background-color: rgb(179, 199, 192);
  grid-area: header;
  /* max-width: min(100vw, 65ch); */
  grid-column: span 3;
  padding: 2rem;
  text-align: center;
  font-size: 1.4em;
  color: white;
  position: sticky;
  left: 0;
  top: 0;
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
  grid-column: span 3;
  padding: 30px;
  text-align: center;
  font-size: 1.4em;
  background-color: #690;
  color: white;
 
}
.read-the-docs {
  color: #888;
}




</style>
