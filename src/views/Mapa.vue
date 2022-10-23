<template>
  <div id="imageContainer"><img v-bind:src="require('../assets/planoIsaac.png')" alt=""></div>
</template>

<style>
img {
  margin: 10px;
  height: 70vh;
  align-content: center;
  border-image-width: 0;
  background: none;
}

#imageContainer{
    margin-top: 2%;
    width: 100%;
    display: flex;
    justify-content: center;
    background: none;
}
</style>
