<template>
  <footer> 
      <div class="footer-wrapper">
        <div class="footer-logo">
                <img src="@/assets/images/paraspell.png" alt="Logo">
        </div>
        <div class="footer-content">
            <div class="contact">
                <p class="heading">Contact</p>
                <p>email: <span>email@abc.com</span></p>
                <p>tel: <span>+421 323 343</span></p>
                <p>general info at: www.info.sk</p>
            </div>
            <div class="important-links">
                <p class="heading">Important links</p>
                <p>Link1 <a href="">www.link.com</a></p>
                <p>Likn2 <a href="">www.link.com</a></p>
                <p>Likn3 <a href="">www.link.com</a></p>
                <p>Likn4 <a href="">www.link.com</a></p>
            </div>
            <div class="terms-and-conditions">
                <p class="heading">Terms & Conditions</p>
                <p>Terms of use: <a href="">Terms of use</a> </p>
                <p>Paraspell 2022 all rights reserved</p>
            </div>
            <div class="socials">
                <p class="heading">Socials</p>
                <div class="socials-icons">
                    <a href=""><TelegramRound/></a>
                    <a href=""><DiscordRound/></a>
                    <a href=""><FacebookRound/></a>
                </div>
            </div>
        </div>
      </div>
      <div class="footer-separator">
        <span>© Paraspell 2022</span>
      </div>
  </footer>
</template>


<style lang="scss">
.footer-wrapper{
    width: 70%;
    padding: 40px 0;
    margin: 0 auto;
    a{
       color: #63e2b7;
       text-decoration: none;
    }
    .heading{
        color: #63e2b7;
        font-size: 1.4rem;
        font-weight: bold;
        font-style: italic;
    }
    .footer-content{
        display: flex;
        justify-content: space-between;
    }
}
.footer-logo{
    img{
        width: 180px;
    }
}
.contact{
    p{
        span{
            color: #63e2b7;
        }
    }
}
.socials-icons{
    display: flex;
    gap: 10px;
    svg{
        width: 50px;
    }
}
.footer-separator{
    padding: 5px 0;
    border-top: 1px solid gray;
    text-align: center;
    span{
        opacity: .7;
    }
}

@media only screen and (max-width: 1200px) {
  .footer-wrapper{
      width: 96%;
  }
}
@media only screen and (max-width: 800px) {
  .footer-content{
      flex-direction: column;
      align-items: center;
      text-align: center;
  }
  .footer-logo{
      display: flex;
      img{
          margin: 0 auto;
      }
  }
}
</style>

<script lang="ts" setup>
import { h, ref, Component, onBeforeMount } from 'vue'
import { NIcon, NMenu, NSpace, NButton } from 'naive-ui'

import {
  TelegramRound,
  DiscordRound,
  FacebookRound
} from '@vicons/material'



</script>