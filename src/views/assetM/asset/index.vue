<template>
  <div class="asset app-container">
    <collapse :class="$style['search']">
      <template v-slot:title>筛选条件</template>
      <template>
        <div>
          <el-form :model="form" inline label-width="100px" ref="form">
            <el-form-item label="渠道" prop="channelName">
              <el-input placeholder="请输入渠道" v-model="form.channelName"></el-input>
            </el-form-item>
            <el-form-item label="借据编号" prop="listId">
              <el-input placeholder="请输入借据编号" v-model="form.listId"></el-input>
            </el-form-item>
            <el-form-item label="借款人姓名" prop="custName">
              <el-input placeholder="请输入借款人姓名" v-model="form.custName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNo">
              <el-input placeholder="请输入身份证号" v-model="form.idNo"></el-input>
            </el-form-item>
            <el-form-item label="放款日期" style="width: 60%">
              <el-col :span="11">
                <el-form-item prop="startDate">
                  <el-date-picker
                    :class="$style['datetime']"
                    placeholder="请选择日期"
                    type="date"
                    v-model="form.startDate"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">&nbsp;-&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item prop="endDate">
                  <el-date-picker
                    :class="$style['datetime']"
                    placeholder="请选择日期"
                    type="date"
                    v-model="form.endDate"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
          <div :class="$style['search-btn-box']">
            <el-button @click="search" icon="el-icon-search" size="medium" type="primary" v-waves>查询</el-button>
            <el-button
              @click="resetForm('form')"
              icon="el-icon-refresh"
              size="medium"
              type="primary"
              v-waves
            >重置</el-button>
          </div>
        </div>
      </template>
    </collapse>
    <!--table-->
    <div :class="$style['content']">
      <blockTitle :hide="trueVal">资产列表</blockTitle>
      <div :class="$style['table-content']">
        <el-table
          :data="list"
          :empty-text="emptyText"
          border
          header-cell-class-name="header-cell-class-name"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column label="渠道" prop="channelName"></el-table-column>
          <el-table-column label="借据编码" prop="listId"></el-table-column>
          <el-table-column label="金融产品" prop="prodId"></el-table-column>
          <el-table-column label="借款人编号" prop="custId"></el-table-column>
          <el-table-column label="借款人姓名" prop="custName"></el-table-column>
          <el-table-column label="身份证号" prop="idNo"></el-table-column>
          <el-table-column :formatter="formatAmount" label="借款金额" prop="loanAmount"></el-table-column>
          <el-table-column label="还款方式" prop="repayMethod"></el-table-column>
          <el-table-column label="利率类型" prop="interestType"></el-table-column>
          <el-table-column :formatter="formatRate" label="利率" prop="interestRate"></el-table-column>
          <el-table-column :formatter="formatAmount" label="贷款余额" prop="bal"></el-table-column>
          <el-table-column label="还款期限" prop="loanTerm"></el-table-column>
          <el-table-column :formatter="formatterData" label="放款日" prop="beginDate"></el-table-column>
          <el-table-column :formatter="formatterData" label="到期日" prop="endDate"></el-table-column>
          <el-table-column :formatter="formatterData" label="起息日" prop="beginDate"></el-table-column>
          <el-table-column label="拆分方式" prop="assetSpiltWay"></el-table-column>
          <el-table-column label="拆分比例" prop="assetSpiltValue"></el-table-column>
          <el-table-column label="出资方" prop="contributiveName"></el-table-column>
          <el-table-column class-name="operate" label="操作">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" size="small" type="primary">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--pagination-->
      <div class="pagination">
        <pagination
          :limit.sync="pagInfo.pageSize"
          :page-sizes="[10,20,30,50]"
          :page.sync="pagInfo.currentPage"
          :total="pagInfo.total"
          @pagination="assetList"
          layout="sizes, prev, pager, next, jumper"
          v-if="pagInfo.total"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Iform {
  channelName: string; // 渠道名称
  listId: string; //结局编号
  custName: string; // 借款人姓名
  idNo: string; // 身份证号
  startDate: string; // 放款开始时间
  endDate: string; // 放款结束时间
}

interface IpagInfo {
  total: number; // 总条数
  currentPage: number; // 当前是第几页
  pageSize: number; // 每页几行
}

import { Component, Vue } from "vue-property-decorator";
import pagination from "@/components/Pagination/index.vue";
import blockTitle from "@/components/blockTitle/index.vue";
import collapse from "@/components/collapse/index.vue";
import formatter from "@/components/mixins/formatter";

@Component({
  name: "asset",
  mixins: [formatter],
  components: {
    pagination,
    blockTitle,
    collapse
  }
})
export default class extends Vue {
  form: Iform = {
    channelName: "",
    listId: "",
    custName: "",
    idNo: "",
    startDate: "",
    endDate: ""
  };

  pagInfo: IpagInfo = {
    // 分页数据
    total: 0,
    currentPage: 1,
    pageSize: 10
  };
  loading: boolean = false; // 是否正在加载中
  list: object[] = []; // 列表数据
  trueVal: boolean = true;
  emptyText: string = " "; // 当没有数据的时候展示的文案
  created() {}

  async assetList() {
    // 查询资产列表
    //发起ajax请求，更改数据
    this.loading = true;
    let data = await this.$api.assetM.assetList({
      pager: {
        pageNo: this.pagInfo.currentPage,
        recordNum: this.pagInfo.pageSize
      },
      body: this.form
    });
    this.list = data.data.list || [];
    this.pagInfo.total = Number(data.data.pager ? data.data.pager.totalNum : 0);
    this.list.length === 0 && (this.emptyText = "无数据");
    this.loading = false;
  }

  search() {
    // 点击查询按钮
    this.pagInfo.currentPage = 1;
    this.assetList();
  }

  resetForm(formName: string) {
    // 重置表单
    // @ts-ignore
    this.$refs[formName].resetFields();
  }

  detail(row: any) {
    // 查看详情
    this.$router.push({
      path: "/assetmanage/assetlistdetail",
      query: { updateId: row.listId }
    });
  }
}
</script>

<style lang="scss" module>
@import "../../../styles/common/asset-list";
</style>
