'use client'

import { PageContainer, ProColumns, ProLayout, ProTable } from "@ant-design/pro-components";
import { EmailRecord } from "@prisma/client";
import { ConfigProvider, DatePicker, Space, Tag } from "antd";
import dayjs from "dayjs";
import { HttpMethod } from "./enum/HttpMethod";

import enUS from 'antd/lib/locale/en_US';

export default function Home() {

	const columns: ProColumns<EmailRecord>[] = [
		{
			title: 'Sender',
			dataIndex: 'sender',
			renderText(text, record, index, action) {
				return <Space direction="vertical">
					<Tag color="blue" key={index}>{text}</Tag>
				</Space>
			},
			search: {
				transform(value: string) {
					if (value.trim() === "") return null
					return transformContains(value, 'sender')
				}
			},
		},
		{
			title: 'Receiver',
			dataIndex: 'receiver',
			renderText(_text, record, index, action) {
				return <Space direction="vertical">
					{record.receiver.map((item, index) => (
						<Tag color="blue" key={index + item}>{item}</Tag>
					))}
				</Space>
			},
			search: {
				transform(value: string) {
					if (value.trim() === "") return null
					return transformSomeHas(value, 'receiver')
				}
			}
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			sorter: true,
			search: {
				transform(value: string) {
					if (value.trim() === "") return null
					return transformContains(value, 'subject')
				}
			}
		},
		{
			title: 'Content',
			dataIndex: 'content',
			sorter: true,
			search: {
				transform(value: string) {
					if (value.trim() === "") return null
					return transformContains(value, 'content')
				}
			}
		},
		{
			title: 'Submitted At',
			dataIndex: 'submitAt',
			valueType: 'dateTime',
			sorter: true,
			search: {
				transform(value: string[]) {
					return transformDateFormat(value, 'submitAt');
				}
			},
			renderFormItem(schema, config, form, action) {
				return <DatePicker.RangePicker picker="date" />
			},
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			valueType: 'dateTime',
			sorter: true,
			renderFormItem(schema, config, form, action) {
				return <DatePicker.RangePicker picker="date" />
			},
			search: {
				transform(value: string[]) {
					return transformDateFormat(value, 'createdAt');
				}
			},
		}
	]

	return (
		<ConfigProvider locale={enUS}>
			<ProLayout layout="top">
				<PageContainer>
					<ProTable
						columns={columns}
						request={async (param, sort, filter) => {
							console.log(param);

							const orderBy = { orderBy: transformSortValues(sort) }
							const fullParam = Object.assign(param, orderBy)
							const request = await fetch("http://localhost:3000/api/email", {
								method: HttpMethod.POST,
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(fullParam)
							});
							const result = await request.json();
							return {
								data: result.data,
								success: true,
								total: result.total
							}
						}}
						pagination={{
							showQuickJumper: true,
							showSizeChanger: true,
							pageSizeOptions: [5, 10, 20]
						}}
					/>
				</PageContainer>
			</ProLayout>
		</ConfigProvider>
	);
}

function transformDateFormat(value: string[], key: any) {
	let gte, lte;
	gte = dayjs(value[0]).format('YYYY-MM-DDT00:00:00.000[Z]');
	lte = dayjs(value[1]).format('YYYY-MM-DDT00:00:00.000[Z]');
	if (value[0] === value[1]) {
		lte = dayjs(value[1]).add(1, 'day').format('YYYY-MM-DDT00:00:00.000[Z]');
	}
	return {
		[key]: {
			gte: gte,
			lte: lte,
		}
	};
}

function transformSortValues(sort: Record<string, any>): Record<string, any> {
	const transformedSort: Record<string, any> = {};
	Object.keys(sort).forEach(key => {
		transformedSort[key] = sort[key].replace('ascend', 'asc').replace('descend', 'desc');
	});
	return transformedSort;
}

function transformContains(value: string, key: string) {
	return {
		[key]: {
			contains: value
		}
	};
}

function transformSomeHas(value: string, key: string) {
	return {
		[key]: {
			has: value
		}
	};
}