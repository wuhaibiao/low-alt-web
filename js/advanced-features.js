// 高级功能模块 - 进一步扩展系统功能

// 实时数据处理模块
class RealTimeDataProcessor {
    constructor() {
        this.dataBuffer = [];
        this.maxBufferSize = 1000;
        this.processingInterval = null;
        this.subscribers = [];
    }

    // 开始实时数据处理
    startProcessing() {
        this.processingInterval = setInterval(() => {
            this.processData();
        }, 1000);
    }

    // 停止数据处理
    stopProcessing() {
        if (this.processingInterval) {
            clearInterval(this.processingInterval);
            this.processingInterval = null;
        }
    }

    // 添加数据到缓冲区
    addData(data) {
        this.dataBuffer.push({
            ...data,
            timestamp: new Date().toISOString()
        });

        // 保持缓冲区大小
        if (this.dataBuffer.length > this.maxBufferSize) {
            this.dataBuffer.shift();
        }
    }

    // 处理数据
    processData() {
        if (this.dataBuffer.length === 0) return;

        const latestData = this.dataBuffer[this.dataBuffer.length - 1];
        
        // 通知所有订阅者
        this.subscribers.forEach(callback => {
            try {
                callback(latestData);
            } catch (error) {
                console.error('数据处理回调错误:', error);
            }
        });
    }

    // 订阅数据更新
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    // 取消订阅
    unsubscribe(callback) {
        const index = this.subscribers.indexOf(callback);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    // 获取统计数据
    getStatistics() {
        return {
            bufferSize: this.dataBuffer.length,
            subscriberCount: this.subscribers.length,
            isProcessing: this.processingInterval !== null
        };
    }
}

// 地图路径规划模块
class PathPlanningModule {
    constructor() {
        this.routes = new Map();
        this.obstacles = [];
        this.waypoints = [];
    }

    // 添加路径点
    addWaypoint(lat, lng, altitude = 100, name = '') {
        const waypoint = {
            id: Date.now(),
            lat,
            lng,
            altitude,
            name: name || `路径点${this.waypoints.length + 1}`,
            timestamp: new Date().toISOString()
        };
        this.waypoints.push(waypoint);
        return waypoint;
    }

    // 移除路径点
    removeWaypoint(waypointId) {
        const index = this.waypoints.findIndex(wp => wp.id === waypointId);
        if (index > -1) {
            this.waypoints.splice(index, 1);
            return true;
        }
        return false;
    }

    // 计算路径
    calculateRoute(startPoint, endPoint, options = {}) {
        const routeId = `route_${Date.now()}`;
        
        // 简单的直线路径计算（实际应用中需要更复杂的算法）
        const route = {
            id: routeId,
            startPoint,
            endPoint,
            waypoints: this.getIntermediateWaypoints(startPoint, endPoint),
            distance: this.calculateDistance(startPoint, endPoint),
            estimatedTime: this.estimateFlightTime(startPoint, endPoint, options.speed || 15),
            altitude: options.altitude || 100,
            created: new Date().toISOString()
        };

        this.routes.set(routeId, route);
        return route;
    }

    // 计算两点间距离（简化版）
    calculateDistance(point1, point2) {
        const R = 6371; // 地球半径（公里）
        const dLat = this.toRadians(point2.lat - point1.lat);
        const dLon = this.toRadians(point2.lng - point1.lng);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // 角度转弧度
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // 估算飞行时间
    estimateFlightTime(startPoint, endPoint, speedKmh) {
        const distance = this.calculateDistance(startPoint, endPoint);
        return (distance / speedKmh) * 60; // 返回分钟
    }

    // 获取中间路径点
    getIntermediateWaypoints(startPoint, endPoint) {
        const intermediatePoints = [];
        const steps = 5; // 分5段
        
        for (let i = 1; i < steps; i++) {
            const ratio = i / steps;
            const lat = startPoint.lat + (endPoint.lat - startPoint.lat) * ratio;
            const lng = startPoint.lng + (endPoint.lng - startPoint.lng) * ratio;
            
            intermediatePoints.push({
                lat,
                lng,
                altitude: 100,
                order: i
            });
        }
        
        return intermediatePoints;
    }

    // 添加禁飞区
    addObstacle(bounds, type = 'no-fly-zone', description = '') {
        const obstacle = {
            id: Date.now(),
            bounds,
            type,
            description,
            created: new Date().toISOString()
        };
        this.obstacles.push(obstacle);
        return obstacle;
    }

    // 检查路径是否穿越禁飞区
    checkRouteConflicts(route) {
        const conflicts = [];
        
        this.obstacles.forEach(obstacle => {
            if (this.routeIntersectsObstacle(route, obstacle)) {
                conflicts.push(obstacle);
            }
        });
        
        return conflicts;
    }

    // 简化的路径与障碍物相交检测
    routeIntersectsObstacle(route, obstacle) {
        // 这里应该实现更复杂的几何相交算法
        // 简化版本只检查起点和终点是否在障碍物内
        return this.pointInBounds(route.startPoint, obstacle.bounds) ||
               this.pointInBounds(route.endPoint, obstacle.bounds);
    }

    // 检查点是否在边界内
    pointInBounds(point, bounds) {
        return point.lat >= bounds.south && point.lat <= bounds.north &&
               point.lng >= bounds.west && point.lng <= bounds.east;
    }
}

// 数据导出模块
class DataExportModule {
    constructor() {
        this.exportFormats = ['json', 'csv', 'xml', 'excel'];
        this.exportHistory = [];
    }

    // 导出设备数据
    async exportDeviceData(devices, format = 'json', options = {}) {
        const exportData = {
            metadata: {
                exportTime: new Date().toISOString(),
                totalRecords: devices.length,
                format: format,
                version: '1.0'
            },
            data: devices.map(device => ({
                ...device,
                exportedAt: new Date().toISOString()
            }))
        };

        return this.processExport(exportData, format, 'device_data', options);
    }

    // 导出任务数据
    async exportTaskData(tasks, format = 'json', options = {}) {
        const exportData = {
            metadata: {
                exportTime: new Date().toISOString(),
                totalRecords: tasks.length,
                format: format,
                version: '1.0'
            },
            data: tasks.map(task => ({
                ...task,
                exportedAt: new Date().toISOString()
            }))
        };

        return this.processExport(exportData, format, 'task_data', options);
    }

    // 导出历史数据
    async exportHistoryData(history, format = 'json', options = {}) {
        const exportData = {
            metadata: {
                exportTime: new Date().toISOString(),
                totalRecords: history.length,
                format: format,
                version: '1.0',
                dateRange: {
                    start: options.startDate,
                    end: options.endDate
                }
            },
            data: history
        };

        return this.processExport(exportData, format, 'history_data', options);
    }

    // 处理导出
    async processExport(data, format, filename, options) {
        const exportRecord = {
            id: Date.now(),
            filename: `${filename}_${new Date().toISOString().split('T')[0]}`,
            format,
            recordCount: data.data.length,
            size: JSON.stringify(data).length,
            timestamp: new Date().toISOString(),
            status: 'processing'
        };

        this.exportHistory.push(exportRecord);

        try {
            let exportContent;
            let mimeType;
            let fileExtension;

            switch (format) {
                case 'json':
                    exportContent = JSON.stringify(data, null, 2);
                    mimeType = 'application/json';
                    fileExtension = 'json';
                    break;
                    
                case 'csv':
                    exportContent = this.convertToCSV(data.data);
                    mimeType = 'text/csv';
                    fileExtension = 'csv';
                    break;
                    
                case 'xml':
                    exportContent = this.convertToXML(data);
                    mimeType = 'application/xml';
                    fileExtension = 'xml';
                    break;
                    
                default:
                    throw new Error(`不支持的导出格式: ${format}`);
            }

            // 创建下载链接
            const blob = new Blob([exportContent], { type: mimeType });
            const url = URL.createObjectURL(blob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${exportRecord.filename}.${fileExtension}`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            URL.revokeObjectURL(url);

            exportRecord.status = 'completed';
            exportRecord.downloadUrl = url;
            
            return {
                success: true,
                exportRecord,
                message: '导出完成'
            };

        } catch (error) {
            exportRecord.status = 'failed';
            exportRecord.error = error.message;
            
            return {
                success: false,
                exportRecord,
                message: `导出失败: ${error.message}`
            };
        }
    }

    // 转换为CSV格式
    convertToCSV(data) {
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');
        
        const csvRows = data.map(row => {
            return headers.map(header => {
                const value = row[header];
                // 处理包含逗号、换行符或双引号的值
                if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        });

        return [csvHeaders, ...csvRows].join('\n');
    }

    // 转换为XML格式
    convertToXML(data) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<export>\n';
        
        // 添加元数据
        xml += '  <metadata>\n';
        Object.entries(data.metadata).forEach(([key, value]) => {
            xml += `    <${key}>${value}</${key}>\n`;
        });
        xml += '  </metadata>\n';
        
        // 添加数据
        xml += '  <data>\n';
        data.data.forEach((item, index) => {
            xml += `    <record id="${index + 1}">\n`;
            Object.entries(item).forEach(([key, value]) => {
                xml += `      <${key}>${value}</${key}>\n`;
            });
            xml += '    </record>\n';
        });
        xml += '  </data>\n';
        xml += '</export>';
        
        return xml;
    }

    // 获取导出历史
    getExportHistory() {
        return this.exportHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // 清理导出历史
    clearExportHistory() {
        this.exportHistory = [];
    }
}

// 系统监控模块
class SystemMonitorModule {
    constructor() {
        this.metrics = {
            cpu: { current: 0, history: [] },
            memory: { current: 0, history: [] },
            network: { current: 0, history: [] },
            storage: { current: 0, history: [] }
        };
        this.monitoringInterval = null;
        this.alertThresholds = {
            cpu: 80,
            memory: 85,
            network: 90,
            storage: 95
        };
        this.alerts = [];
    }

    // 开始监控
    startMonitoring() {
        this.monitoringInterval = setInterval(() => {
            this.collectMetrics();
        }, 5000); // 每5秒收集一次数据
    }

    // 停止监控
    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
    }

    // 收集系统指标（模拟数据）
    collectMetrics() {
        const timestamp = new Date().toISOString();
        
        // 模拟CPU使用率
        this.metrics.cpu.current = Math.random() * 100;
        this.metrics.cpu.history.push({
            value: this.metrics.cpu.current,
            timestamp
        });

        // 模拟内存使用率
        this.metrics.memory.current = Math.random() * 100;
        this.metrics.memory.history.push({
            value: this.metrics.memory.current,
            timestamp
        });

        // 模拟网络使用率
        this.metrics.network.current = Math.random() * 100;
        this.metrics.network.history.push({
            value: this.metrics.network.current,
            timestamp
        });

        // 模拟存储使用率
        this.metrics.storage.current = Math.random() * 100;
        this.metrics.storage.history.push({
            value: this.metrics.storage.current,
            timestamp
        });

        // 保持历史数据在合理范围内（最近100个数据点）
        Object.keys(this.metrics).forEach(key => {
            if (this.metrics[key].history.length > 100) {
                this.metrics[key].history.shift();
            }
        });

        // 检查告警阈值
        this.checkAlertThresholds();
    }

    // 检查告警阈值
    checkAlertThresholds() {
        Object.entries(this.alertThresholds).forEach(([metric, threshold]) => {
            const currentValue = this.metrics[metric].current;
            
            if (currentValue > threshold) {
                this.createAlert({
                    type: 'system_performance',
                    metric,
                    currentValue,
                    threshold,
                    severity: currentValue > threshold + 10 ? 'critical' : 'warning',
                    message: `${metric.toUpperCase()} 使用率过高: ${currentValue.toFixed(1)}% (阈值: ${threshold}%)`
                });
            }
        });
    }

    // 创建告警
    createAlert(alertData) {
        const alert = {
            id: Date.now(),
            ...alertData,
            timestamp: new Date().toISOString(),
            acknowledged: false
        };

        this.alerts.push(alert);
        
        // 保持告警列表在合理大小
        if (this.alerts.length > 50) {
            this.alerts.shift();
        }
    }

    // 获取当前系统状态
    getSystemStatus() {
        return {
            overall: this.calculateOverallHealth(),
            metrics: Object.fromEntries(
                Object.entries(this.metrics).map(([key, data]) => [
                    key,
                    {
                        current: data.current,
                        trend: this.calculateTrend(data.history),
                        status: data.current > this.alertThresholds[key] ? 'warning' : 'normal'
                    }
                ])
            ),
            activeAlerts: this.alerts.filter(alert => !alert.acknowledged).length,
            uptime: this.calculateUptime()
        };
    }

    // 计算整体健康状态
    calculateOverallHealth() {
        const values = Object.values(this.metrics).map(metric => metric.current);
        const average = values.reduce((sum, val) => sum + val, 0) / values.length;
        
        if (average < 50) return 'excellent';
        if (average < 70) return 'good';
        if (average < 85) return 'fair';
        return 'poor';
    }

    // 计算趋势
    calculateTrend(history) {
        if (history.length < 2) return 'stable';
        
        const recent = history.slice(-5); // 最近5个数据点
        const first = recent[0].value;
        const last = recent[recent.length - 1].value;
        const change = ((last - first) / first) * 100;
        
        if (change > 10) return 'increasing';
        if (change < -10) return 'decreasing';
        return 'stable';
    }

    // 计算系统运行时间（模拟）
    calculateUptime() {
        return '7天 14小时 32分钟';
    }

    // 确认告警
    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedAt = new Date().toISOString();
        }
    }

    // 获取性能报告
    getPerformanceReport(timeRange = '24h') {
        const now = new Date();
        let startTime;
        
        switch (timeRange) {
            case '1h':
                startTime = new Date(now.getTime() - 60 * 60 * 1000);
                break;
            case '24h':
                startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                break;
            case '7d':
                startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            default:
                startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        }

        const report = {
            timeRange,
            generatedAt: now.toISOString(),
            summary: this.getSystemStatus(),
            metrics: {},
            recommendations: []
        };

        // 为每个指标生成统计信息
        Object.entries(this.metrics).forEach(([key, data]) => {
            const relevantData = data.history.filter(
                entry => new Date(entry.timestamp) >= startTime
            );

            if (relevantData.length > 0) {
                const values = relevantData.map(entry => entry.value);
                report.metrics[key] = {
                    average: values.reduce((sum, val) => sum + val, 0) / values.length,
                    min: Math.min(...values),
                    max: Math.max(...values),
                    current: data.current,
                    dataPoints: relevantData.length
                };
            }
        });

        // 生成建议
        report.recommendations = this.generateRecommendations(report.metrics);

        return report;
    }

    // 生成性能建议
    generateRecommendations(metrics) {
        const recommendations = [];

        Object.entries(metrics).forEach(([metric, data]) => {
            if (data.average > this.alertThresholds[metric]) {
                recommendations.push({
                    type: 'performance',
                    priority: 'high',
                    metric,
                    message: `${metric.toUpperCase()} 平均使用率 (${data.average.toFixed(1)}%) 超过建议阈值，考虑优化或升级相关资源`
                });
            }

            if (data.max > 95) {
                recommendations.push({
                    type: 'capacity',
                    priority: 'medium',
                    metric,
                    message: `${metric.toUpperCase()} 峰值使用率达到 ${data.max.toFixed(1)}%，建议监控容量并考虑扩容`
                });
            }
        });

        return recommendations;
    }
}

// 导出模块供全局使用
window.AdvancedFeatures = {
    RealTimeDataProcessor,
    PathPlanningModule,
    DataExportModule,
    SystemMonitorModule
};

// 初始化高级功能实例
window.realTimeProcessor = new RealTimeDataProcessor();
window.pathPlanner = new PathPlanningModule();
window.dataExporter = new DataExportModule();
window.systemMonitor = new SystemMonitorModule();

console.log('高级功能模块已加载完成');