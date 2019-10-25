import React, {Component} from "react";
import propTypes from "prop-types";
import "./index.less";
import { ListView, PullToRefresh } from 'antd-mobile';
import ProductItem from "@src/component/productItem";
import ListBodyWrap from "@src/component/ListBodyWrap";


class MyListView extends Component {
	constructor(props) {
		super(props);

		this.initData = [];
		const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		this.state = {
			pageNum: 1,
			pageSize: 10,
			dataSource: dataSource.cloneWithRows(this.initData),
			hasMore: true,
			refreshing: false,
			isLoading: true,
			down: true,
		}
	}

	static propTypes = {
		apiData: propTypes.object.isRequired,
		listHeight: propTypes.any.isRequired
	};

	componentDidMount() {
		this.getList();
	}

	getList() {
		const {pageNum, pageSize, dataSource} =  this.state;
		const {apiName, apiUrl, apiParams} =  this.props.apiData;
		let requestParams = Object.assign({},{pageNum, pageSize}, apiParams);
		apiName(apiUrl, requestParams).then(res => {
			if (res.code === 200) {
				this.initData = this.state.refreshing ? res.data : this.initData.concat(res.data);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.initData),
					hasMore: res.data && res.data.length >= pageSize
				})
			}
		}).catch(err => {
			console.log(err)
		}).finally(() => {
			setTimeout(() => {
				this.setState({ refreshing: false, isLoading: false });
			}, 1000)
		})
	}

	onRefresh() {
		this.setState({pageNum: 1, refreshing: true});
		this.getList();
	}

	onEndReached = (event) => {
		let {pageNum} = this.state;
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: true, pageNum: ++pageNum  });
		this.getList();
	}

	renderRow(item, rowID) {
		return (
			<ProductItem product={item} key={rowID} />
		);
	}

	renderFooter() {
		return (<div style={{ padding: 10, textAlign: 'center' }}>
			{this.state.isLoading ? 'Loading...' : 'Loaded'}
		</div>)
	}

	render() {
		return (
			<section style={{height: "100%"}}>
				<ListView
					style={{height: this.props.listHeight, overflowY: "auto"}}
					dataSource={this.state.dataSource}
					initialListSize={this.state.pageSize}
					pageSize={this.state.pageSize}
					renderBodyComponent={() => <ListBodyWrap />}
					renderRow={(item) => this.renderRow(item)}
					renderFooter={() => this.renderFooter()}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={15}
					pullToRefresh={<PullToRefresh
						refreshing={this.state.refreshing}
						onRefresh={() => this.onRefresh()}
					/>}
				/>
			</section>
		)
	}
}

export default MyListView;