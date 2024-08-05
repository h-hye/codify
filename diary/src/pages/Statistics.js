import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const Statistics = () => {
    const [diaryData, setDiaryData] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    const [writtenDays, setWrittenDays] = useState(0);

    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const response = await axiosInstance.get('/api/diary');
                const data = response.data;
                setDiaryData(data);

                const dates = new Set(data.map((entry) => entry.date));
                setWrittenDays(dates.size);

                const currentMonth = new Date().getMonth();
                const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
                setTotalDays(daysInMonth);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDiaryData();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const getEmotionLevel = (emotion) => {
        const emotions = ['good', 'soso', 'bad', 'sad', 'angry'];
        return emotions.indexOf(emotion) + 1;
    };

    const chartData = {
        labels: Array.from({ length: totalDays }, (_, i) =>
            formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1))
        ),
        datasets: [
            {
                label: 'Emotion Levels',
                data: diaryData.map((entry) => ({
                    x: formatDate(entry.date),
                    y: getEmotionLevel(entry.emotion),
                })),
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => ['Good', 'Soso', 'Bad', 'Sad', 'Angry'][value - 1],
                },
            },
        },
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                },
            },
        },
    };

    return (
        <div>
            <h1>Statistics</h1>
            <Line data={chartData} options={options} />
            <p>이번 달 전체 날자 수: {totalDays}</p>
            <p>작성한 날자 수: {writtenDays}</p>
            <p>일기 수: {diaryData.length}</p>
        </div>
    );
};

export default Statistics;
