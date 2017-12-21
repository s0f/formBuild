<template>
    <div class="sft-release sft-main">
        <el-container class="margin-top-xll">
            <el-main>
                <div class="in" v-if="publish">
                    <h2>新的表单</h2>
                    <div class="url-wrap">
                        <el-input placeholder="请输入内容" :value="link | replaceHttpPrefix" id="releaseUrl">
                            <template slot="prepend">http://</template>
                            <template slot="append">
                                <div class="tools">
                                    <span class="copy" ref="copyBtn" data-clipboard-target="#releaseUrl">复制</span>
                                    <a class="open" :href="link" target="_blank">打开</a>
                                </div>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="in" v-else>
                    <h2><i class="el-icon-success"></i>新的表单</h2>
                    <h3>一切就绪，可以发布啦！</h3>
                    <p>点击发布按钮，生成表单的访问链接</p>

                    <div class="publish-wrap margin-top-xll">
                        <el-button type="primary" @click="reviewHandle">发布</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import clipboard from 'clipboard';

    export default {
        name: 'release',
        data () {
            return {
            	publish: true,
                link: window.location.origin + '/' + 'review.html'
            }
        },
        filters: {
        	replaceHttpPrefix(val) {
        		return val.slice(7);
            }
        },
        created () {

            this.$store.commit('updateStep', {
                step: 5
            });
        },
        mounted () {
            let clipboardd = new clipboard('.copy');
            let self = this;
            clipboardd.on('success', function(e) {
                 self.$message({
                    message: '复制成功！',
                    type: 'success'
                });
                e.clearSelection();
            });

            console.log(clipboardd)
            clipboardd.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        },
        methods: {
            reviewHandle() {
            	window.open('/review.html');
//            	this.$router.push({ name: 'review', params: {id: 12}});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/var';

    h2 {
        line-height: 3;
        color: $primary;
        font-size: $f-size-max;

        i{
            margin-right: 10px;
            font-size: 30px;
            line-height: 2;
            vertical-align: middle;
        }
    }

    h2 + h3 {
        font-size: $f-size-big;
        line-height: 2;
    }

    h3 + p {
        font-size: $f-size;
        color: $text-default;
    }

    .sft-release {
        background: #3c3c3c;

        .in {
            padding-top: 100px;
            margin: 0 auto;
            width: 800px;
            height: 300px;
            background: #fff;
            border: 1px solid #b5b5b5;
            border-radius: 5px;
        }
    }

    .url-wrap{
        width: 600px;
        margin: 0 auto;
    }

    .tools{
        line-height: 100%;

        span,a{
            margin: 0 4px;
            color: $primary;
            cursor: pointer;
            text-decoration: none;
        }
    }
</style>
