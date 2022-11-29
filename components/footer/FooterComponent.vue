<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <img src="@/assets/images/sub-scaffold.png" alt="Logo" />
      </div>
      <div class="sponsors">
        <p class="heading">Sponsors</p>
        <p>
          <a target="_blank" href="https://github.com/paraspell"
            >ParaSpell<span class="icon"><OpenInNewRound /></span
          ></a>
        </p>
      </div>
      <div class="about-section">
        <p class="heading">About</p>
        <p>
          <a target="_blank" href="https://github.com/paraspell"
            >ParaSpell GitHub <span class="icon"><OpenInNewRound /></span
          ></a>
        </p>
        <p>
          <a target="_blank" href="https://github.com/kodadot"
            >KodaDot GitHub <span class="icon"><OpenInNewRound /></span
          ></a>
        </p>
      </div>
      <div class="socials">
        <p class="heading">Socials</p>
        <div class="socials-icons">
          <a href=""><TelegramRound /></a>
          <a href=""><DiscordRound /></a>
          <a href=""><FacebookRound /></a>
          <a href=""><RedditRound /></a>
        </div>
      </div>
    </div>
    <div class="footer-separator">
      <span>© sub-scaffold 2022</span>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-content {
  width: 70%;
  padding: 20px 0;
  margin: 0 auto;
  a {
    color: #63e2b7;
    text-decoration: none;
  }
  .heading {
    color: #63e2b7;
    font-size: 1.4rem;
    font-weight: bold;
    font-style: italic;
  }
  display: flex;
  justify-content: space-around;
  a {
    display: flex;
    .icon {
      display: flex;
      align-items: center;
      margin-left: 5px;
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
.footer-logo {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 150px;
  img {
    width: 100%;
  }
}
.socials-icons {
  display: flex;
  gap: 10px;
  svg {
    width: 33px;
  }
}
.footer-separator {
  padding: 5px 0;
  border-top: 1px solid gray;
  text-align: center;
  span {
    opacity: 0.7;
  }
}

@media only screen and (max-width: 1200px) {
  .footer-content {
    width: 96%;
  }
}
@media only screen and (max-width: 800px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    a {
      justify-content: center;
    }
  }
  .footer-logo {
    display: flex;
    img {
      margin: 0 auto;
    }
  }
}
</style>

<script lang="ts" setup>
import {
  DiscordRound,
  FacebookRound,
  OpenInNewRound,
  RedditRound,
  TelegramRound,
} from '@vicons/material'
</script>
