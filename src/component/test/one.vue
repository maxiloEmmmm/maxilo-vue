<template>
  <div>hi</div>
</template>

<script>
export default {
  name: 'testOne',
  mounted(){
    this.$store.commit('maxilo-bootstrap-component/addDropMenu', {
            uuid: this._uid,
            instance: this
        });
  }
}
</script>


