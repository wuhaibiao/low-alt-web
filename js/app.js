// Vue 3 应用实例
const { createApp, ref, reactive, onMounted, computed } = Vue;

createApp({
    setup() {
        // 认证状态
        const isAuthenticated = ref(false);
        const currentUser = ref('');
        const loginMode = ref('login');
        const errorMessage = ref('');
        
        // 导航状态
        const currentView = ref('dashboard');
        const sidebarCollapsed = ref(false);
        const unreadAlerts = ref(12);

        // 表单数据
        const loginForm = reactive({
            username: '',
            password: ''
        });

        const registerForm = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        // 时间显示
        const currentTime = ref('');

        // 无人机数据
        const totalDrones = ref(242);
        const onlineDrones = ref(198);
        const flyingDrones = ref(156);
        const taskDrones = ref(124);
        const alertDrones = ref(26);

        // 图片上传相关数据
        const selectedImageId = ref('');
        const uploadedImage = ref('');
        const uploadedFileName = ref('');
        const extractedNumber = ref('');
        const processedImage = ref('');
        const uploadMessage = ref('');
        const messageType = ref('success');
        const isProcessing = ref(false);

        // 预设的可选图片列表(你已经准备好的图片)
        const availableImages = ref([
            { id: 'img001', name: '无人机图像001', path: 'assets/images/img001.jpg', number: '001' },
            { id: 'img002', name: '无人机图像002', path: 'assets/images/img002.jpg', number: '002' },
            { id: 'img003', name: '无人机图像003', path: 'assets/images/img003.jpg', number: '003' },
            { id: 'img01', name: '无人机图像01', path: 'assets/images/img01.jpg', number: '01' },
            { id: 'img02', name: '无人机图像02', path: 'assets/images/img02.jpg', number: '02' },
            { id: 'img1', name: '无人机图像1', path: 'assets/images/img1.jpg', number: '1' },
            { id: 'img2', name: '无人机图像2', path: 'assets/images/img2.jpg', number: '2' }
        ]);

        // 视频相关数据
        const selectedVideo = ref('');
        const videoPlayer = ref(null);
        const videoList = ref([
            {
                id: 'video1',
                title: '低空无人机巡检演示',
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                description: '这是一段低空无人机巡检的演示视频,展示了无人机在城市环境中进行安全巡检的全过程。视频包含起飞、巡航、数据采集和降落等关键环节。'
            },
            {
                id: 'video2',
                title: '环境监测无人机作业',
                src: 'https://www.w3schools.com/html/movie.mp4',
                description: '环境监测无人机在工业园区执行空气质量检测任务,实时采集环境数据,为环保部门提供决策依据。'
            },
            {
                id: 'video3',
                title: '应急救援训练场景',
                src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                description: '应急救援无人机在复杂地形中执行搜救任务演练,展示了无人机在紧急情况下的快速响应能力和精准定位功能。'
            },
            {
                id: 'video4',
                title: '智能识别与追踪',
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                description: '展示无人机的AI智能识别系统,能够自动识别目标并进行实时追踪,提高巡检效率和准确性。'
            },
            {
                id: 'video5',
                title: '夜间红外巡检',
                src: 'https://www.w3schools.com/html/movie.mp4',
                description: '利用红外热成像技术,无人机在夜间进行安全巡检,及时发现异常热源和潜在安全隐患。'
            }
        ]);

        // 预设的处理后图片映射 (编号 -> 图片URL)
        const processedImageMap = {
            '001': 'assets/processed/img001_processed.jpg',
            '002': 'assets/processed/img002_processed.jpg',
            '003': 'assets/processed/img003_processed.jpg',
            '004': 'assets/processed/img004_processed.jpg',
            '005': 'assets/processed/img005_processed.jpg',
            '01': 'assets/processed/img01_processed.jpg',
            '02': 'assets/processed/img02_processed.jpg',
            '03': 'assets/processed/img03_processed.jpg',
            '1': 'assets/processed/img1_processed.jpg',
            '2': 'assets/processed/img2_processed.jpg',
            '3': 'assets/processed/img3_processed.jpg'
        };
        // 无人机列表数据
        const droneList = ref([
            {
                id: 1,
                name: '巡检无人机001号',
                status: 'online',
                statusText: '在线',
                time: '06/10 12:10'
            },
            {
                id: 2,
                name: '巡检无人机002号',
                status: 'flying',
                statusText: '执行任务',
                time: '06/10 11:45'
            },
            {
                id: 3,
                name: '巡检无人机003号',
                status: 'alert',
                statusText: '告警',
                time: '06/10 10:30'
            },
            {
                id: 4,
                name: '巡检无人机004号',
                status: 'online',
                statusText: '在线',
                time: '06/10 09:15'
            },
            {
                id: 5,
                name: '巡检无人机005号',
                status: 'idle',
                statusText: '离线',
                time: '06/09 18:20'
            }
        ]);

        // 设备管理数据
        const totalDevices = ref(245);
        const onlineDevices = ref(203);
        const warningDevices = ref(8);
        const offlineDevices = ref(34);
        
        const deviceList = ref([
            {
                id: 1,
                name: '环境监测无人机-01',
                status: 'online',
                statusText: '在线',
                type: '环境监测',
                serialNumber: 'ENV-001',
                location: '东区公园',
                battery: 85,
                lastOnline: '2 分钟前'
            },
            {
                id: 2,
                name: '安全巡检无人机-02',
                status: 'flying',
                statusText: '飞行中',
                type: '安全巡检',
                serialNumber: 'SEC-002',
                location: '南区工业园',
                battery: 67,
                lastOnline: '实时'
            },
            {
                id: 3,
                name: '救援无人机-03',
                status: 'maintenance',
                statusText: '维护中',
                type: '应急救援',
                serialNumber: 'RES-003',
                location: '北区医院',
                battery: 0,
                lastOnline: '1 小时前'
            },
            {
                id: 4,
                name: '数据采集无人机-04',
                status: 'online',
                statusText: '在线',
                type: '数据采集',
                serialNumber: 'DAT-004',
                location: '西区温室',
                battery: 92,
                lastOnline: '30 秒前'
            },
            {
                id: 5,
                name: '测绘无人机-05',
                status: 'error',
                statusText: '故障',
                type: '测绘映射',
                serialNumber: 'SUR-005',
                location: '中区广场',
                battery: 45,
                lastOnline: '15 分钟前'
            }
        ]);

        // 任务管理数据
        const totalTasks = ref(158);
        const runningTasks = ref(42);
        const completedTasks = ref(98);
        const pendingTasks = ref(18);
        
        const taskList = ref([
            {
                id: 1,
                name: '东区环境监测任务',
                status: 'running',
                statusText: '执行中',
                device: '环境监测无人机-01',
                progress: 65,
                startTime: '2025-10-04 09:00',
                estimatedEnd: '2025-10-04 15:00',
                priority: 'high'
            },
            {
                id: 2,
                name: '南区安全巡检',
                status: 'pending',
                statusText: '等待中',
                device: '安全巡检无人机-02',
                progress: 0,
                startTime: '2025-10-04 14:00',
                estimatedEnd: '2025-10-04 18:00',
                priority: 'medium'
            },
            {
                id: 3,
                name: '北区紧急救援训练',
                status: 'completed',
                statusText: '已完成',
                device: '救援无人机-03',
                progress: 100,
                startTime: '2025-10-04 08:00',
                estimatedEnd: '2025-10-04 12:00',
                priority: 'high'
            }
        ]);

        // 告警数据
        const alertList = ref([
            {
                id: 1,
                title: '设备电量低告警',
                message: '测绘无人机-05 电量低于 50%，请及时充电',
                level: 'high',
                time: '2025-10-04 13:45',
                status: 'unread'
            },
            {
                id: 2,
                title: '通信信号异常',
                message: '安全巡检无人机-02 信号强度低于阈值',
                level: 'medium',
                time: '2025-10-04 13:30',
                status: 'unread'
            },
            {
                id: 3,
                title: '任务执行延迟',
                message: '东区环境监测任务进度落后，预计延迟 30 分钟',
                level: 'low',
                time: '2025-10-04 13:15',
                status: 'read'
            },
            {
                id: 4,
                title: '设备离线通知',
                message: '环境监测无人机-01 已离线超过 5 分钟',
                level: 'medium',
                time: '2025-10-04 12:50',
                status: 'read'
            }
        ]);

        // 用户管理数据
        const userList = ref([
            {
                id: 1,
                username: 'admin',
                email: 'admin@system.com',
                role: '系统管理员',
                status: 'active',
                lastLogin: '2025-10-04 13:20'
            },
            {
                id: 2,
                username: 'operator1',
                email: 'op1@system.com',
                role: '操作员',
                status: 'active',
                lastLogin: '2025-10-04 10:15'
            },
            {
                id: 3,
                username: 'monitor1',
                email: 'mon1@system.com',
                role: '监控员',
                status: 'inactive',
                lastLogin: '2025-10-03 18:30'
            }
        ]);

        // 历史数据
        const historyStartDate = ref('');
        const historyEndDate = ref('');
        const historyList = ref([
            {
                id: 1,
                time: '2025-10-04 13:45',
                device: '测绘无人机-05',
                event: '电量告警',
                details: '电量低于 50%，自动返航'
            },
            {
                id: 2,
                time: '2025-10-04 13:30',
                device: '安全巡检无人机-02',
                event: '任务开始',
                details: '开始执行南区安全巡检任务'
            },
            {
                id: 3,
                time: '2025-10-04 12:00',
                device: '救援无人机-03',
                event: '任务完成',
                details: '北区紧急救援训练任务完成'
            }
        ]);

        // 系统设置
        const settings = reactive({
            systemName: '低空无人机感知系统',
            refreshInterval: 5,
            alertLevel: 'medium',
            mapCenter: [34.7465, 113.6254],
            maxDevices: 500,
            dataRetention: 30
        });

        // 地图实例
        let map = null;
        let droneMarkers = [];

        // 图表实例
        let sensorCharts = [];
        let dataChart = null;

        // 初始化默认用户
        const users = ref([
            { username: 'admin', password: '123456', email: 'admin@system.com' }
        ]);

        // 计算当前视频信息
        const currentVideoInfo = computed(() => {
            if (!selectedVideo.value) return { title: '', src: '', description: '' };
            return videoList.value.find(v => v.id === selectedVideo.value) || { title: '', src: '', description: '' };
        });

        // 处理图片选择
        const handleImageSelect = () => {
            uploadMessage.value = '';
            
            if (!selectedImageId.value) {
                uploadedImage.value = '';
                uploadedFileName.value = '';
                extractedNumber.value = '';
                processedImage.value = '';
                return;
            }

            // 查找选中的图片
            const selectedImg = availableImages.value.find(img => img.id === selectedImageId.value);
            if (!selectedImg) return;

            // 设置选中图片信息
            uploadedImage.value = selectedImg.path;
            uploadedFileName.value = selectedImg.name;
            extractedNumber.value = selectedImg.number;

            // 显示全屏加载动画
            isProcessing.value = true;
            processedImage.value = ''; // 清空之前的处理结果

            // 模拟2秒处理时间
            setTimeout(() => {
                isProcessing.value = false;
                
                // 查找对应的处理后图片
                if (processedImageMap[selectedImg.number]) {
                    processedImage.value = processedImageMap[selectedImg.number];
                    uploadMessage.value = '处理成功!';
                    messageType.value = 'success';
                } else {
                    processedImage.value = '';
                    uploadMessage.value = `未找到编号 ${selectedImg.number} 对应的处理后图片!`;
                    messageType.value = 'error';
                }

                // 3秒后清除提示信息
                setTimeout(() => { uploadMessage.value = ''; }, 3000);
            }, 2000);
        };

        // 切换视频
        const changeVideo = () => {
            if (videoPlayer.value) {
                videoPlayer.value.load();
            }
        };

        // 处理视频错误
        const handleVideoError = () => {
            uploadMessage.value = '视频加载失败,请检查网络连接或视频源!';
            messageType.value = 'error';
            setTimeout(() => { uploadMessage.value = ''; }, 3000);
        };

        // 导航相关方法
        const toggleSidebar = () => {
            sidebarCollapsed.value = !sidebarCollapsed.value;
        };

        const switchView = (view) => {
            currentView.value = view;
            // 如果切换到监控面板，重新初始化地图
            if (view === 'dashboard') {
                setTimeout(initMap, 300);
            }
            // 如果切换到数据分析，初始化图表
            if (view === 'analysis') {
                setTimeout(initDataChart, 300);
            }
        };

        // 设备管理方法
        const refreshDevices = () => {
            // 模拟刷新设备列表
            console.log('刷新设备列表');
        };

        const viewDevice = (device) => {
            console.log('查看设备:', device.name);
        };

        const editDevice = (device) => {
            console.log('编辑设备:', device.name);
        };

        const deleteDevice = (device) => {
            if (confirm(`确定要删除设备 ${device.name} 吗？`)) {
                const index = deviceList.value.findIndex(d => d.id === device.id);
                if (index > -1) {
                    deviceList.value.splice(index, 1);
                    totalDevices.value--;
                }
            }
        };

        // 任务管理方法
        const createTask = () => {
            console.log('创建新任务');
        };

        const pauseTask = (task) => {
            task.status = 'paused';
            task.statusText = '已暂停';
        };

        const resumeTask = (task) => {
            task.status = 'running';
            task.statusText = '执行中';
        };

        const cancelTask = (task) => {
            if (confirm(`确定要取消任务 ${task.name} 吗？`)) {
                task.status = 'cancelled';
                task.statusText = '已取消';
            }
        };

        // 告警管理方法
        const markAlertRead = (alert) => {
            alert.status = 'read';
            unreadAlerts.value = Math.max(0, unreadAlerts.value - 1);
        };

        const clearAllAlerts = () => {
            alertList.value.forEach(alert => alert.status = 'read');
            unreadAlerts.value = 0;
        };

        // 用户管理方法
        const addUser = () => {
            console.log('添加新用户');
        };

        const editUser = (user) => {
            console.log('编辑用户:', user.username);
        };

        const deleteUser = (user) => {
            if (confirm(`确定要删除用户 ${user.username} 吗？`)) {
                const index = userList.value.findIndex(u => u.id === user.id);
                if (index > -1) {
                    userList.value.splice(index, 1);
                }
            }
        };

        // 历史数据方法
        const searchHistory = () => {
            console.log('查询历史数据:', historyStartDate.value, '-', historyEndDate.value);
        };

        const exportHistory = () => {
            console.log('导出历史数据');
        };

        // 系统设置方法
        const saveSettings = () => {
            console.log('保存设置:', settings);
            alert('设置已保存');
        };

        const resetSettings = () => {
            if (confirm('确定要重置所有设置吗？')) {
                Object.assign(settings, {
                    systemName: '低空无人机感知系统',
                    refreshInterval: 5,
                    alertLevel: 'medium',
                    mapCenter: [34.7465, 113.6254],
                    maxDevices: 500,
                    dataRetention: 30
                });
            }
        };

        // 初始化数据分析图表
        const initDataChart = () => {
            setTimeout(() => {
                const ctx = document.getElementById('dataChart');
                if (ctx && !dataChart) {
                    dataChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['全00', '全02', '全04', '全06', '全08', '全10', '全12', '全14'],
                            datasets: [{
                                label: '在线设备数',
                                data: [180, 190, 185, 200, 195, 205, 198, 203],
                                borderColor: '#00d4ff',
                                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                                tension: 0.4,
                                fill: true
                            }, {
                                label: '任务执行数',
                                data: [25, 30, 28, 35, 32, 40, 38, 42],
                                borderColor: '#00ff88',
                                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                                tension: 0.4,
                                fill: true
                            }, {
                                label: '告警数量',
                                data: [5, 3, 7, 2, 8, 4, 6, 3],
                                borderColor: '#ff4444',
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                tension: 0.4,
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: '#ffffff'
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: { color: '#ffffff' },
                                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                                },
                                y: {
                                    ticks: { color: '#ffffff' },
                                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                                }
                            }
                        }
                    });
                }
            }, 500);
        };

        // 登录处理
        const handleLogin = () => {
            errorMessage.value = '';
            
            // 验证用户
            const user = users.value.find(u => 
                u.username === loginForm.username && u.password === loginForm.password
            );

            if (user) {
                isAuthenticated.value = true;
                currentUser.value = user.username;
                // 保存登录状态到localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', user.username);
                // 清空表单
                loginForm.username = '';
                loginForm.password = '';
                // 初始化主界面
                setTimeout(initMainInterface, 100);
            } else {
                errorMessage.value = '用户名或密码错误';
            }
        };

        // 注册处理
        const handleRegister = () => {
            errorMessage.value = '';

            // 验证表单
            if (registerForm.password !== registerForm.confirmPassword) {
                errorMessage.value = '密码不一致';
                return;
            }

            if (registerForm.password.length < 6) {
                errorMessage.value = '密码长度至少6位';
                return;
            }

            // 检查用户名是否已存在
            if (users.value.find(u => u.username === registerForm.username)) {
                errorMessage.value = '用户名已存在';
                return;
            }

            // 添加新用户
            users.value.push({
                username: registerForm.username,
                email: registerForm.email,
                password: registerForm.password
            });

            // 自动登录
            isAuthenticated.value = true;
            currentUser.value = registerForm.username;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', registerForm.username);

            // 清空表单
            Object.keys(registerForm).forEach(key => {
                registerForm[key] = '';
            });

            // 初始化主界面
            setTimeout(initMainInterface, 100);
        };

        // 登出处理
        const logout = () => {
            isAuthenticated.value = false;
            currentUser.value = '';
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('currentUser');
            
            // 清理地图和图表
            if (map) {
                map.remove();
                map = null;
            }
            sensorCharts.forEach(chart => chart.destroy());
            sensorCharts = [];
        };

        // 更新时间
        const updateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            currentTime.value = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
        };

        // 初始化地图
        const initMap = () => {
            // 等待DOM渲染完成
            setTimeout(() => {
                const mapElement = document.getElementById('map');
                if (!mapElement) return;

                // 创建地图实例
                map = L.map('map').setView([34.7465, 113.6254], 7);

                // 添加深色主题地图图层
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '© OpenStreetMap contributors © CartoDB',
                    subdomains: 'abcd',
                    maxZoom: 19
                }).addTo(map);

                // 模拟无人机位置数据
                const dronePositions = [
                    { id: 1, lat: 34.7465, lng: 113.6254, name: '巡检无人机001号', status: 'online' },
                    { id: 2, lat: 34.8465, lng: 113.7254, name: '巡检无人机002号', status: 'flying' },
                    { id: 3, lat: 34.6465, lng: 113.5254, name: '巡检无人机003号', status: 'alert' },
                    { id: 4, lat: 34.9465, lng: 113.8254, name: '巡检无人机004号', status: 'online' },
                    { id: 5, lat: 34.5465, lng: 113.4254, name: '巡检无人机005号', status: 'idle' }
                ];

                // 添加无人机标记
                dronePositions.forEach(drone => {
                    const color = getStatusColor(drone.status);
                    
                    // 创建自定义图标
                    const droneIcon = L.divIcon({
                        className: 'drone-marker',
                        html: `<div style="
                            width: 30px; 
                            height: 30px; 
                            background: ${color}; 
                            border: 3px solid white; 
                            border-radius: 50%; 
                            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 12px;
                            font-weight: bold;
                        ">
                            <i class="fas fa-drone" style="font-size: 14px;"></i>
                        </div>`,
                        iconSize: [30, 30],
                        iconAnchor: [15, 15]
                    });

                    const marker = L.marker([drone.lat, drone.lng], { icon: droneIcon })
                        .bindPopup(`
                            <div style="color: #333; font-size: 14px;">
                                <strong>${drone.name}</strong><br>
                                状态: <span style="color: ${color};">${getStatusText(drone.status)}</span><br>
                                位置: ${drone.lat.toFixed(4)}, ${drone.lng.toFixed(4)}
                            </div>
                        `)
                        .addTo(map);

                    droneMarkers.push(marker);
                });

                // 添加控制按钮
                const legend = L.control({position: 'bottomright'});
                legend.onAdd = function (map) {
                    const div = L.DomUtil.create('div', 'legend');
                    div.innerHTML = `
                        <div style="
                            background: rgba(26, 35, 50, 0.9); 
                            padding: 10px; 
                            border-radius: 5px; 
                            color: white; 
                            font-size: 12px;
                            border: 1px solid rgba(0, 212, 255, 0.3);
                        ">
                            <div><span style="color: #00d4ff;">●</span> 在线</div>
                            <div><span style="color: #ffaa00;">●</span> 执行任务</div>
                            <div><span style="color: #ff4444;">●</span> 告警</div>
                            <div><span style="color: #888888;">●</span> 离线</div>
                        </div>
                    `;
                    return div;
                };
                legend.addTo(map);

            }, 500);
        };

        // 获取状态颜色
        const getStatusColor = (status) => {
            const colors = {
                'online': '#00d4ff',
                'flying': '#ffaa00',
                'alert': '#ff4444',
                'idle': '#888888'
            };
            return colors[status] || '#888888';
        };

        // 获取状态文本
        const getStatusText = (status) => {
            const texts = {
                'online': '在线',
                'flying': '执行任务',
                'alert': '告警',
                'idle': '离线'
            };
            return texts[status] || '未知';
        };

        // 初始化传感器图表
        const initSensorCharts = () => {
            setTimeout(() => {
                // 传感器1图表
                const ctx1 = document.getElementById('sensor1Chart');
                if (ctx1) {
                    const chart1 = new Chart(ctx1, {
                        type: 'line',
                        data: {
                            labels: ['', '', '', '', '', '', ''],
                            datasets: [{
                                data: [65, 70, 68, 72, 69, 74, 71],
                                borderColor: '#00d4ff',
                                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                x: { display: false },
                                y: { display: false }
                            },
                            elements: {
                                point: { radius: 0 }
                            }
                        }
                    });
                    sensorCharts.push(chart1);
                }

                // 传感器2图表
                const ctx2 = document.getElementById('sensor2Chart');
                if (ctx2) {
                    const chart2 = new Chart(ctx2, {
                        type: 'line',
                        data: {
                            labels: ['', '', '', '', '', '', ''],
                            datasets: [{
                                data: [45, 52, 48, 55, 50, 58, 53],
                                borderColor: '#00ff88',
                                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                x: { display: false },
                                y: { display: false }
                            },
                            elements: {
                                point: { radius: 0 }
                            }
                        }
                    });
                    sensorCharts.push(chart2);
                }
            }, 1000);
        };

        // 初始化主界面
        const initMainInterface = () => {
            initMap();
            initSensorCharts();
            
            // 模拟实时数据更新
            setInterval(() => {
                // 随机更新无人机数量
                totalDrones.value = 240 + Math.floor(Math.random() * 10);
                onlineDrones.value = 195 + Math.floor(Math.random() * 8);
                flyingDrones.value = 150 + Math.floor(Math.random() * 15);
                taskDrones.value = 120 + Math.floor(Math.random() * 10);
                alertDrones.value = 20 + Math.floor(Math.random() * 15);
            }, 5000);
        };

        // 组件挂载时的初始化
        onMounted(() => {
            // 检查登录状态
            const savedAuth = localStorage.getItem('isAuthenticated');
            const savedUser = localStorage.getItem('currentUser');
            
            if (savedAuth === 'true' && savedUser) {
                isAuthenticated.value = true;
                currentUser.value = savedUser;
                setTimeout(initMainInterface, 100);
            }

            // 启动时间更新
            updateTime();
            setInterval(updateTime, 1000);
        });

        return {
            // 认证相关
            isAuthenticated,
            currentUser,
            loginMode,
            errorMessage,
            loginForm,
            registerForm,
            handleLogin,
            handleRegister,
            logout,
            
            // 导航相关
            currentView,
            sidebarCollapsed,
            unreadAlerts,
            toggleSidebar,
            switchView,
            
            // 数据相关
            currentTime,
            totalDrones,
            onlineDrones,
            flyingDrones,
            taskDrones,
            alertDrones,
            droneList,
            
            // 图片上传
            selectedImageId,
            availableImages,
            uploadedImage,
            uploadedFileName,
            extractedNumber,
            processedImage,
            uploadMessage,
            messageType,
            isProcessing,
            handleImageSelect,

            // 视频播放
            selectedVideo,
            videoPlayer,
            videoList,
            currentVideoInfo,
            changeVideo,
            handleVideoError,

            // 设备管理
            totalDevices,
            onlineDevices,
            warningDevices,
            offlineDevices,
            deviceList,
            refreshDevices,
            viewDevice,
            editDevice,
            deleteDevice,
            
            // 任务管理
            totalTasks,
            runningTasks,
            completedTasks,
            pendingTasks,
            taskList,
            createTask,
            pauseTask,
            resumeTask,
            cancelTask,
            
            // 告警管理
            alertList,
            markAlertRead,
            clearAllAlerts,
            
            // 用户管理
            userList,
            addUser,
            editUser,
            deleteUser,
            
            // 历史数据
            historyStartDate,
            historyEndDate,
            historyList,
            searchHistory,
            exportHistory,
            
            // 系统设置
            settings,
            saveSettings,
            resetSettings
        };
    }
}).mount('#app');