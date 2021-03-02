import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../App.css';
import {Table, Input, Button, Popconfirm, Form, Tag} from 'antd';
import {EditableCell, EditableRow} from './EditableCell'
const EditableContext = React.createContext(null);


export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
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
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };


    render() {
        const { budget } = this.props;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.props.handleSave,
                    categories: this.props.categories
                }),
            };
        });
        return (
            <div style={{width: '100%'}}>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a row
                </Button>
                <Table
                    style={{width: '100%'}}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={budget.expenses}
                    columns={columns}
                    pagination={false}
                />
            </div>
        );
    }
}