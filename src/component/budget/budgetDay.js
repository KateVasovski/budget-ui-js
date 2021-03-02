import React from "react";
import {get} from "../../network"
import { InputNumber, Typography , Row, Col , DatePicker} from 'antd';
import "antd/dist/antd.css";
import { Select } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import moment from 'moment';
import { Table, Divider, Tag } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { EditableTable } from './EditableTable';
import { Calendar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export class BudgetDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = { budget: {
                expenses: [],
                balance: null,
                date: null,
                endDate: null
            },
            date: moment(),
            categories: []
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        get("budget/day?day="+ this.state.date.format("yyyy-MM-DD")).then(budget => {
            this.setState({budget: budget});
        })
        get("category").then(categories => {
            this.setState({categories: categories});
        })
    }

    onChange(value) {
        this.setState({day: value})
        get("budget/day?day=" + value.format("yyyy-MM-DD")).then(budget => {
            this.setState({budget: budget, expenses: budget.expenses});
        })
    }

    onClick(){
        let expenses = this.state.budget.expenses.slice()
        expenses.push({new: true, amount: 0, category: {id: 1, name: ""}, date: this.state.budget.date})
        this.setState({ budget: {
            ...this.state.budget,
            expenses: expenses
            }})
    }

    handleSave = (row) => {
        const newData = [...this.state.budget.expenses];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({budget: {
            ...this.state.budget,
            expenses: newData
        }});
    };

    render() {
        return <div>
            <Calendar fullscreen={false} onChange={this.onChange} defaultValue={moment([2021, 0, 13])}/>
            <Row style={{padding: '10px'}}>
                <Col span={6}>
                    <Typography>Date:</Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.date}</Typography>
                </Col>
            </Row>
            <Row>
                <EditableTable style={{width: '100%'}}
                               budget={this.state.budget}
                               handleSave={this.handleSave}
                               categories={this.state.categories}
                />
            </Row>
            <Row>
                <Col span={6}>
                    <Typography>Total minus: </Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.expenses ? this.state.budget.expenses
                        .map(e => e.amount)
                        .reduce((a, b) => a + b, 0)
                            : 0
                    }</Typography>
                </Col>
                <Col offset={9}>
                    <Button type="primary" icon={<PlusOutlined/>} shape="round" size={"large"} onClick={(e) => this.onClick(e)}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Typography>Remains: </Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.balance}</Typography>
                </Col>
            </Row>
        </div>;
    }
}

const columns = [
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        editable: true,
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        editable: true,
        render: category => {
            let color = 'geekblue';
            return (
                <Tag color={color} key={category?.id}>
                    {category?.name}
                </Tag>
            );
        }
    }
];
