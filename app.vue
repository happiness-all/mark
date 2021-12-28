<style lang="less">
html {
	overflow-y: hidden;
}
.container {
	min-height: 100vh;
	position: relative;
	.top {
		position: fixed;
		top: 0px;
		border: 1px solid #409efd;
		height: 40px;
		width: 100%;
		line-height: 40px;
	}
	.middle {
		position: fixed;
		top: 60px;
		border: 1px solid #409efd;
		height: 100px;
		width: 80%;
		line-height: 40px;
		margin-left: 10%;
	}
	.table-wrap {
		position: fixed;
		top: 220px;
		height: calc(100% - 220px);
		overflow-y: scroll;
		width: 100%;
	}
	.back {
		// background: #2069a9;
		margin-top: 40px;
	}
}
</style>
<template>
	<div class="container">
		<div class="top" ref="top">导航条</div>
		<div class="middle" ref="middle">中间区域</div>
		<div class="table-wrap" @scroll="handleScroll" ref="tableWrap">
			<el-table :data="tableData" style="width: 100%" ref="table">
				<el-table-column
					prop="date"
					label="日期"
					sortable
					column-key="date"
					:filters="[
						{ text: '2016-05-01', value: '2016-05-01' },
						{ text: '2016-05-02', value: '2016-05-02' },
						{ text: '2016-05-03', value: '2016-05-03' },
						{ text: '2016-05-04', value: '2016-05-04' },
					]"
					:filter-method="filterHandler"
				>
				</el-table-column>
				<el-table-column prop="name" label="姓名"> </el-table-column>
				<el-table-column prop="address" label="地址" :formatter="formatter">
				</el-table-column>
				<el-table-column
					prop="tag"
					label="标签"
					:filters="[
						{ text: '家', value: '家' },
						{ text: '公司', value: '公司' },
					]"
					:filter-method="filterTag"
					filter-placement="bottom-end"
				>
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.tag === '家' ? 'primary' : 'success'"
							disable-transitions
							>{{ scope.row.tag }}</el-tag
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="back" ref="back" v-watermark="999"></div>
	</div>
</template>

<script>
export default {
	name: "P3",
	props: {},
	components: {},
	methods: {
		clickDelete() {},
		clickEdit() {},
		filterTag(value, row) {
			return row.tag === value;
		},
		filterHandler(value, row, column) {
			const property = column["property"];
			return row[property] === value;
		},
		formatter(row) {
			return row.address;
		},
		handleScroll(e1) {
			console.log(e1);
			let bili = this.$refs.tableWrap.scrollTop / (this.tableHeight - 420)
			let scrollheight = (this.totalHeight - 600) * bili
			document.querySelector('html').scrollTop = scrollheight

			
			console.log(this.$refs.tableWrap.scrollTop);
		},
	},
	computed: {},
	data() {
		return {
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
					tag: "家",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
					tag: "公司",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
					tag: "家",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
					tag: "公司",
				},
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
					tag: "家",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
					tag: "公司",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
					tag: "家",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
					tag: "公司",
				},
			],
			tableHeight: 0,
			totalHeight: 0,
		};
	},
	activated() {},
	deactivated() {},
	watch: {},
	mounted() {
		this.$nextTick(() => {
			let h1 = this.$refs.top.offsetHeight;
			let h2 = this.$refs.middle.offsetHeight;
			let h3 = this.$refs.table.$el.offsetHeight;
			this.tableHeight = h3
			let totalHeight = h1 + h2 + h3 + 20 + 60 - h1;
			this.totalHeight = totalHeight
			console.log(totalHeight);
			this.$refs.back.style.height = totalHeight + 'px'
		});
	},
};
</script>
