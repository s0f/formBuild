<template>
<div class="list">
    <headerDefault></headerDefault>
    <div id="form-list">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="表单名称" width="180">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="480">
            </el-table-column>
            <el-table-column prop="createTime" label="创建">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button @click="handleClick" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>

    </div>
</div>
</template>
<script>
import headerDefault from '../../components/header/headerDefault';
export default {
    name: "list",
    data: () => ({
        tableData: []
    }),
    components: {
        headerDefault
    },
    created() {
        let self = this;
        this.$http.get('http://easy-mock.com/mock/5961e71e9adc231f357c229e/example/list')
            .then((res) => {
                if (res.data.data) {
                    self.tableData = res.data.data;
                }
            });
    },
    methods: {
        handleClick() {
            this.$router.push({
                name: 'formContent'
            });
        }
    }
}
</script>
<style lang="scss">
#form-list {
    text-align: left;
}
</style>
