<template>
  <div class="container col-12 mx-10 mt-5">
    <form class="mx-30">
      
        <div class="mb-3 col-3">
          <label for="exampleFormControlInput1" class="form-label">Asunto</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3 col-8">
          <label for="exampleFormControlTextarea1" class="form-label">Sugerencia</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
      </div>
      
    </form>
  </div>
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
