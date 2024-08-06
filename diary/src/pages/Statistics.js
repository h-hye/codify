import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Statistics = () => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);
    const [diaryData, setDiaryData] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    const [writtenDays, setWrittenDays] = useState(0);
    const navigate = useNavigate();

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
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
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
            <div className='main-nav'>
                <span className='main-nav-brand' onClick={() => navigate('/main')}>
                    Codify
                </span>
                <div className='main-nav-links'>
                    <a href='/diary' className='main-nav-link'>
                        Create
                    </a>
                    <a href='/main' className='main-nav-link'>
                        Diary
                    </a>
                    <a href='/statistics' className='main-nav-link active'>
                        Statistics
                    </a>
                </div>
                <a href='/mypage' className='main-nav-link main-nav-link-mypage'>
                    MyPage
                </a>
            </div>
            <h1>Statistics</h1>
            <Line data={chartData} options={options} />
            <p>이번 달 전체 날짜 수: {totalDays}</p>
            <p>작성한 날짜 수: {writtenDays}</p>
            <p>일기 수: {diaryData.length}</p>
        </div>
    );
};

export default Statistics;
