<template>
  <div class="app-container">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in items" :key="item">
        <img :src="item" alt="" style="width: 100%; height: 150px;">
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="10" style="margin-top: 10px;">
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
    </el-row>
        <el-row :gutter="10">
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
      <el-col :span="8">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通知公告</div>
          </div>
        </div>    
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['/static/1.jpg', '/static/2.jpg']
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
      background: #f0f2f5;
      height: 100%;
  }
  .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
  }
  .grid-content {
        min-height: 100px;
        background:#fff;
    }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    border-radius: 4px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      margin: 15px auto 10px;
      padding: 5px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 50px;
      height: 50px;
      text-align: center;
    }
    .card-panel-icon {
      font-size: 36px;
    }
    .card-panel-description {
      margin-top: 10px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>

