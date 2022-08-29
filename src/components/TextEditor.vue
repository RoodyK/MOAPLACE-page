<template>
  <QuillEditor theme="snow" :toolbar="toolbar" :style="`height:`+ height+'px'">
        
    </QuillEditor>
</template>

<script>
export default {
  name: 'TextEditor',
  props:{
    height: String,
  },
  data(){
    return{
        toolbar:[
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            //['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction

            //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            //[{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                                         // remove formatting button
            ['image'],
            //['link', 'image', 'video']                         // link and image, video
        ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>