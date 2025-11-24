// 图表和数据可视化模块

class ChartVisualizationModule {
    constructor() {
        this.charts = new Map();
        this.defaultColors = {
            primary: '#00d4ff',
            secondary: '#00ff88',
            warning: '#ffaa00',
            danger: '#ff4444',
            info: '#6c7ce0',
            success: '#00d25b',
            gradients: {
                blue: ['#00d4ff', '#0088cc'],
                green: ['#00ff88', '#00cc66'],
                orange: ['#ffaa00', '#cc8800'],
                red: ['#ff4444', '#cc3333'],
                purple: ['#aa44ff', '#8833cc']
            }
        };
        this.chartConfigs = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Microsoft YaHei'
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#ffffff',
                        font: {
                            family: 'Microsoft YaHei'
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    ticks: { 
                        color: '#ffffff',
                        font: {
                            family: 'Microsoft YaHei'
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        };
    }

    // 创建实时数据监控图表
    createRealTimeChart(canvasId, options = {}) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas element with id '${canvasId}' not found`);
            return null;
        }

        const config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: options.label || '实时数据',
                    data: [],
                    borderColor: this.defaultColors.primary,
                    backgroundColor: this.createGradient(ctx, this.defaultColors.gradients.blue, 0.1),
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                ...this.chartConfigs,
                scales: {
                    ...this.chartConfigs.scales,
                    x: {
                        ...this.chartConfigs.scales.x,
                        type: 'linear',
                        position: 'bottom'
                    }
                },
                plugins: {
                    ...this.chartConfigs.plugins,
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(26, 35, 50, 0.9)',
                        titleColor: '#00d4ff',
                        bodyColor: '#ffffff',
                        borderColor: '#00d4ff',
                        borderWidth: 1
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建设备状态饼图
    createDeviceStatusPieChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        this.defaultColors.primary,
                        this.defaultColors.secondary,
                        this.defaultColors.warning,
                        this.defaultColors.danger
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2
                }]
            },
            options: {
                ...this.chartConfigs,
                cutout: '60%',
                plugins: {
                    ...this.chartConfigs.plugins,
                    legend: {
                        ...this.chartConfigs.plugins.legend,
                        position: 'bottom'
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建任务执行进度条形图
    createTaskProgressBarChart(canvasId, tasks) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'bar',
            data: {
                labels: tasks.map(task => task.name),
                datasets: [{
                    label: '完成进度 (%)',
                    data: tasks.map(task => task.progress),
                    backgroundColor: tasks.map(task => 
                        task.progress > 80 ? this.defaultColors.secondary :
                        task.progress > 50 ? this.defaultColors.primary :
                        task.progress > 20 ? this.defaultColors.warning :
                        this.defaultColors.danger
                    ),
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                ...this.chartConfigs,
                scales: {
                    ...this.chartConfigs.scales,
                    y: {
                        ...this.chartConfigs.scales.y,
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    ...this.chartConfigs.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建多维数据雷达图
    createMultiDimensionalRadarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'radar',
            data: {
                labels: data.dimensions,
                datasets: data.datasets.map((dataset, index) => ({
                    label: dataset.label,
                    data: dataset.values,
                    borderColor: Object.values(this.defaultColors.gradients)[index % 5][0],
                    backgroundColor: this.createGradient(ctx, Object.values(this.defaultColors.gradients)[index % 5], 0.2),
                    pointBackgroundColor: Object.values(this.defaultColors.gradients)[index % 5][0],
                    pointBorderColor: '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: Object.values(this.defaultColors.gradients)[index % 5][0]
                }))
            },
            options: {
                ...this.chartConfigs,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#ffffff',
                            font: {
                                family: 'Microsoft YaHei'
                            }
                        },
                        ticks: {
                            color: '#ffffff',
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建时间序列热力图
    createHeatmapChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // 使用散点图模拟热力图效果
        const config = {
            type: 'scatter',
            data: {
                datasets: [{
                    label: '活动强度',
                    data: data.points,
                    backgroundColor: function(context) {
                        const value = context.parsed.v || 0;
                        const intensity = Math.min(value / data.maxValue, 1);
                        return `rgba(0, 212, 255, ${intensity})`;
                    },
                    pointRadius: function(context) {
                        const value = context.parsed.v || 0;
                        return Math.max(2, (value / data.maxValue) * 15);
                    }
                }]
            },
            options: {
                ...this.chartConfigs,
                scales: {
                    x: {
                        ...this.chartConfigs.scales.x,
                        type: 'linear',
                        title: {
                            display: true,
                            text: '时间',
                            color: '#ffffff'
                        }
                    },
                    y: {
                        ...this.chartConfigs.scales.y,
                        type: 'linear',
                        title: {
                            display: true,
                            text: '区域',
                            color: '#ffffff'
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建混合图表（柱状图 + 折线图）
    createMixedChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        type: 'bar',
                        label: data.barDataset.label,
                        data: data.barDataset.data,
                        backgroundColor: this.defaultColors.primary,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        type: 'line',
                        label: data.lineDataset.label,
                        data: data.lineDataset.data,
                        borderColor: this.defaultColors.warning,
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                ...this.chartConfigs,
                scales: {
                    x: this.chartConfigs.scales.x,
                    y: {
                        ...this.chartConfigs.scales.y,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: data.barDataset.yAxisLabel,
                            color: '#ffffff'
                        }
                    },
                    y1: {
                        ...this.chartConfigs.scales.y,
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: data.lineDataset.yAxisLabel,
                            color: '#ffffff'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建3D效果柱状图
    create3DBarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.label,
                    data: data.values,
                    backgroundColor: data.values.map((value, index) => {
                        const colors = Object.values(this.defaultColors.gradients);
                        return this.createGradient(ctx, colors[index % colors.length], 0.8);
                    }),
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false,
                }]
            },
            options: {
                ...this.chartConfigs,
                plugins: {
                    ...this.chartConfigs.plugins,
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }

    // 创建渐变背景
    createGradient(ctx, colors, alpha = 1) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, this.hexToRgba(colors[0], alpha));
        gradient.addColorStop(1, this.hexToRgba(colors[1], alpha * 0.1));
        return gradient;
    }

    // 颜色转换函数
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // 更新图表数据
    updateChart(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (!chart) {
            console.error(`Chart with id '${chartId}' not found`);
            return;
        }

        if (newData.labels) {
            chart.data.labels = newData.labels;
        }

        if (newData.datasets) {
            newData.datasets.forEach((dataset, index) => {
                if (chart.data.datasets[index]) {
                    Object.assign(chart.data.datasets[index], dataset);
                }
            });
        }

        chart.update();
    }

    // 添加实时数据点
    addRealTimeData(chartId, timestamp, value) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        const maxDataPoints = 50;
        
        chart.data.labels.push(timestamp);
        chart.data.datasets[0].data.push(value);

        // 保持数据点数量在限制内
        if (chart.data.labels.length > maxDataPoints) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update('none'); // 无动画更新以提高性能
    }

    // 销毁图表
    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.destroy();
            this.charts.delete(chartId);
        }
    }

    // 销毁所有图表
    destroyAllCharts() {
        this.charts.forEach(chart => chart.destroy());
        this.charts.clear();
    }

    // 导出图表为图片
    exportChartAsImage(chartId, filename = 'chart') {
        const chart = this.charts.get(chartId);
        if (!chart) {
            console.error(`Chart with id '${chartId}' not found`);
            return;
        }

        const canvas = chart.canvas;
        const url = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = url;
        link.click();
    }

    // 获取图表统计信息
    getChartStatistics() {
        return {
            totalCharts: this.charts.size,
            chartIds: Array.from(this.charts.keys()),
            memoryUsage: this.estimateMemoryUsage()
        };
    }

    // 估算内存使用量
    estimateMemoryUsage() {
        let totalDataPoints = 0;
        this.charts.forEach(chart => {
            chart.data.datasets.forEach(dataset => {
                totalDataPoints += dataset.data.length;
            });
        });
        return `约 ${(totalDataPoints * 8 / 1024).toFixed(2)} KB`; // 粗略估算
    }

    // 创建仪表盘样式的圆形进度图
    createGaugeChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [data.value, data.max - data.value],
                    backgroundColor: [
                        data.value > 80 ? this.defaultColors.danger :
                        data.value > 60 ? this.defaultColors.warning :
                        this.defaultColors.secondary,
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                ...this.chartConfigs,
                cutout: '80%',
                rotation: -90,
                circumference: 180,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            },
            plugins: [{
                id: 'gaugeText',
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2 + 20;
                    
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 24px Microsoft YaHei';
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(`${data.value}%`, centerX, centerY);
                    
                    ctx.font = '14px Microsoft YaHei';
                    ctx.fillStyle = '#cccccc';
                    ctx.fillText(data.label, centerX, centerY + 25);
                    ctx.restore();
                }
            }]
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        return chart;
    }
}

// 数据处理工具类
class DataProcessor {
    // 数据平滑处理
    static smoothData(data, windowSize = 5) {
        const smoothed = [];
        for (let i = 0; i < data.length; i++) {
            const start = Math.max(0, i - Math.floor(windowSize / 2));
            const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
            const window = data.slice(start, end);
            const average = window.reduce((sum, val) => sum + val, 0) / window.length;
            smoothed.push(average);
        }
        return smoothed;
    }

    // 计算移动平均线
    static calculateMovingAverage(data, period) {
        const movingAverages = [];
        for (let i = period - 1; i < data.length; i++) {
            const window = data.slice(i - period + 1, i + 1);
            const average = window.reduce((sum, val) => sum + val, 0) / period;
            movingAverages.push(average);
        }
        return movingAverages;
    }

    // 数据标准化
    static normalizeData(data) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min;
        return data.map(value => (value - min) / range);
    }

    // 异常值检测
    static detectOutliers(data, threshold = 2) {
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
        const stdDev = Math.sqrt(variance);
        
        return data.map((value, index) => ({
            index,
            value,
            isOutlier: Math.abs(value - mean) > threshold * stdDev,
            zScore: (value - mean) / stdDev
        }));
    }

    // 时间序列数据聚合
    static aggregateTimeSeriesData(data, interval = 'hour') {
        const aggregated = new Map();
        
        data.forEach(point => {
            const date = new Date(point.timestamp);
            let key;
            
            switch (interval) {
                case 'hour':
                    key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
                    break;
                case 'day':
                    key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    break;
                case 'week':
                    const weekStart = new Date(date);
                    weekStart.setDate(date.getDate() - date.getDay());
                    key = `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
                    break;
                default:
                    key = point.timestamp;
            }
            
            if (!aggregated.has(key)) {
                aggregated.set(key, {
                    timestamp: key,
                    values: [],
                    count: 0
                });
            }
            
            const bucket = aggregated.get(key);
            bucket.values.push(point.value);
            bucket.count++;
        });
        
        return Array.from(aggregated.values()).map(bucket => ({
            timestamp: bucket.timestamp,
            average: bucket.values.reduce((sum, val) => sum + val, 0) / bucket.count,
            min: Math.min(...bucket.values),
            max: Math.max(...bucket.values),
            count: bucket.count
        }));
    }
}

// 导出模块
window.ChartVisualization = {
    ChartVisualizationModule,
    DataProcessor
};

// 初始化全局图表管理器
window.chartManager = new ChartVisualizationModule();

console.log('图表可视化模块已加载完成');