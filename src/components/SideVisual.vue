<template>
    <div class="side-visual">
        <div class="sub-bg">
            <div 
                class="sub-bg-img"
                :style="{'background-image': 'url(' + require(`@/assets/background-${img}.png`) + ')'}"></div>
        </div>
        <div class="side-text">
            <p>{{menu}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideVisual',
    props:{
        menu: String,
        img: String,
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/common.scss';
    *{margin: 0; padding: 0; list-style: none; text-decoration: none;}
    .side-visual{
        width: 100%;
        position: relative;
        .sub-bg{
            height: 520px;
            .sub-bg-img{
                height: 100%;
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
            }
        }
        .side-text{
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Cormorant Infant',sans-serif;
            font-weight: 100;
            font-size: 42px;
            color: #fff;
            text-align: center;
            user-select: none;
            line-height: 0;
            p{
                width: $width;
                margin: 0 auto;
                line-height: 1;
                text-shadow: 5px 5px 5px rgba($black,0.5);
                letter-spacing: 2px;
            }
            &::after{
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 0.5px;
                    box-shadow: 5px 5px 5px rgba($black,0.5);
                    background: #fff;
                }
            
        }
    }
</style>