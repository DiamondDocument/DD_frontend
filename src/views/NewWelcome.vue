<template>
  <section class="main">
    <section class="main-structure">
      <header>
        <a href="#">

          <div class="logo">
            Study
          </div>
        </a>
        <div class="menu-logo">

          <!--            <el-icon><Close /></el-icon>-->
          <el-icon><Grid /></el-icon>
        </div>
      </header>
      <div class="content">
        <img class="active" src="../assets/logo.png">

        <section class="text-description">
          <h1></h1>
          <h2></h2>
          <p></p>
        </section>
      </div>
      <footer>
        <el-icon><Share /></el-icon>
      </footer>
    </section>
    <section class="aside">

    </section>

  </section>
</template>

<script>
export default {
  name: "NewWelcome"
}
</script>

<style>
:root {
  --main-desktop-font-size: 25px;
  --main-pad-font-size: calc(var(--main-desktop-font-size) * 4.8 / 6);
  --main-border-color: #111;
  --header-toggle-width: 25px;
  --header-pad-toggle-width: calc(var(--header-toggle-width) * 5 / 6);
  --main-background-color: #333;
  --main-text-color: #fff;
  --screen-desktop-padding-top-bottom: 25px;
  --screen-desktop-padding-left-right: 40px;
  --screen-pad-padding-top-bottom: 8px;
  --screen-pad-padding-left-right: 25px;
  --footer-icon-width: 25px;
  --footer-pad-icon-width: calc(var(--footer-icon-width) * 5 / 6);
}

* {
  box-sizing: border-box;
  -webkit-user-drag: none;
}

html, template {
  all: unset;
  width: 100vw;
  height: 100vh;
  font-size: var(--main-desktop-font-size);
  color: var(--main-text-color);
}

.main-structure,
.main-structure header,
.main-structure .content,
.main-structure footer {
  width: 100%;
  border: 5px dashed var(--main-border-color);
  user-select: none;
  background-color: var(--main-background-color);
}

.main-structure {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: perspective(5000px) translateX(0px) translateY(0) translateZ(0)
    rotateX(0deg) rotateY(0) rotateZ(0deg);
}

.main-structure header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-structure header .menu-logo {
  width: var(--header-toggle-width);
  height: var(--header-toggle-width);
  background-repeat: no-repeat;
  background-position: center;
  background-size: var(--header-toggle-width);
}

.main-structure header a {
  display: inline-block;
  text-decoration: none;
  color: var(--main-text-color);
}

.main-structure header,
.main-structure .content,
.main-structure footer {
  padding: var(--screen-desktop-padding-top-bottom) var(--screen-desktop-padding-left-right);
  transition: 0.4s;
}

.main-structure footer el-icon {
  width: var(--footer-icon-width);
}

.main-structure .content img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: ellipse(0% 0% at 0% 50%);
  padding: 0;
  margin: 0;
  /*z-index: -1;*/
}

.main-structure .content img.active {
  clip-path: ellipse(150% 70% at 0% 50%);
}
/*@media (max-width: 1000px) {*/

/*  .main-structure {*/
/*    font-size: var(--main-pad-font-size);*/
/*  }*/
/*  .main-structure header,*/
/*  .main-structure .content,*/
/*  .main-structure footer {*/
/*    padding: var(--screen-pad-padding-top-bottom) var(--screen-pad-padding-left-right);*/
/*  }*/

/*  .main-structure header .logo {*/
/*    width: var(--header-toggle-width);*/
/*    height: var(--header-toggle-width);*/
/*    background-size: var(--header-pad-toggle-width);*/
/*  }*/

/*  .main-structure footer el-icon {*/
/*    width: var(--footer-pad-icon-width);*/
/*  }*/
/*}*/
</style>