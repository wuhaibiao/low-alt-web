// 工具类和辅助函数模块

// 日期时间工具类
class DateTimeUtils {
    // 格式化日期时间
    static formatDateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    // 计算时间差
    static getTimeDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = Math.abs(end - start);
        
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, totalMs: diffMs };
    }

    // 相对时间显示
    static getRelativeTime(date) {
        const now = new Date();
        const target = new Date(date);
        const diffMs = now - target;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return '刚刚';
        if (diffMin < 60) return `${diffMin}分钟前`;
        if (diffHour < 24) return `${diffHour}小时前`;
        if (diffDay < 7) return `${diffDay}天前`;
        return this.formatDateTime(date, 'MM-DD HH:mm');
    }

    // 获取时间范围
    static getTimeRange(type) {
        const now = new Date();
        const start = new Date();

        switch (type) {
            case 'today':
                start.setHours(0, 0, 0, 0);
                break;
            case 'yesterday':
                start.setDate(now.getDate() - 1);
                start.setHours(0, 0, 0, 0);
                now.setDate(now.getDate() - 1);
                now.setHours(23, 59, 59, 999);
                break;
            case 'week':
                start.setDate(now.getDate() - 7);
                break;
            case 'month':
                start.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                start.setFullYear(now.getFullYear() - 1);
                break;
            default:
                start.setDate(now.getDate() - 1);
        }

        return { start, end: now };
    }

    // 生成时间序列
    static generateTimeSequence(startDate, endDate, interval = 'hour') {
        const sequence = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const current = new Date(start);

        while (current <= end) {
            sequence.push(new Date(current));
            
            switch (interval) {
                case 'minute':
                    current.setMinutes(current.getMinutes() + 1);
                    break;
                case 'hour':
                    current.setHours(current.getHours() + 1);
                    break;
                case 'day':
                    current.setDate(current.getDate() + 1);
                    break;
                case 'week':
                    current.setDate(current.getDate() + 7);
                    break;
                case 'month':
                    current.setMonth(current.getMonth() + 1);
                    break;
            }
        }

        return sequence;
    }
}

// 数学计算工具类
class MathUtils {
    // 计算距离（经纬度）
    static calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // 地球半径（公里）
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // 角度转弧度
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // 弧度转角度
    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    // 生成随机数
    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // 生成随机整数
    static randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 数值格式化
    static formatNumber(number, decimals = 2) {
        return parseFloat(number).toFixed(decimals);
    }

    // 百分比计算
    static calculatePercentage(value, total) {
        if (total === 0) return 0;
        return (value / total) * 100;
    }

    // 平均值计算
    static average(numbers) {
        if (numbers.length === 0) return 0;
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }

    // 中位数计算
    static median(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    }

    // 标准差计算
    static standardDeviation(numbers) {
        const avg = this.average(numbers);
        const variance = numbers.reduce((sum, num) => sum + Math.pow(num - avg, 2), 0) / numbers.length;
        return Math.sqrt(variance);
    }

    // 线性插值
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // 限制数值范围
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

// 字符串工具类
class StringUtils {
    // 生成UUID
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 生成随机字符串
    static generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // 截断文本
    static truncate(text, maxLength, suffix = '...') {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length) + suffix;
    }

    // 首字母大写
    static capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // 转换为驼峰命名
    static toCamelCase(text) {
        return text.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    }

    // 转换为短横线命名
    static toKebabCase(text) {
        return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    // 移除HTML标签
    static stripHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    // 高亮关键词
    static highlightKeywords(text, keywords, className = 'highlight') {
        let result = text;
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            result = result.replace(regex, `<span class="${className}">$1</span>`);
        });
        return result;
    }

    // 字节大小格式化
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

// 数组工具类
class ArrayUtils {
    // 数组去重
    static unique(array) {
        return [...new Set(array)];
    }

    // 数组分块
    static chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    // 数组混洗
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // 数组分组
    static groupBy(array, key) {
        return array.reduce((groups, item) => {
            const group = typeof key === 'function' ? key(item) : item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    }

    // 数组排序
    static sortBy(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = typeof key === 'function' ? key(a) : a[key];
            const bVal = typeof key === 'function' ? key(b) : b[key];
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }

    // 数组查找
    static findBy(array, key, value) {
        return array.find(item => 
            typeof key === 'function' ? key(item) === value : item[key] === value
        );
    }

    // 数组过滤
    static filterBy(array, filters) {
        return array.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (typeof value === 'function') {
                    return value(item[key]);
                }
                return item[key] === value;
            });
        });
    }

    // 数组分页
    static paginate(array, page, pageSize) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
            data: array.slice(start, end),
            currentPage: page,
            totalPages: Math.ceil(array.length / pageSize),
            totalItems: array.length,
            hasNext: end < array.length,
            hasPrev: page > 1
        };
    }
}

// 对象工具类
class ObjectUtils {
    // 深拷贝
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const cloned = {};
            Object.keys(obj).forEach(key => {
                cloned[key] = this.deepClone(obj[key]);
            });
            return cloned;
        }
    }

    // 合并对象
    static merge(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.merge(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.merge(target, ...sources);
    }

    // 检查是否为对象
    static isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    // 获取嵌套属性
    static get(obj, path, defaultValue = undefined) {
        const keys = path.split('.');
        let result = obj;

        for (const key of keys) {
            if (result === null || result === undefined || !(key in result)) {
                return defaultValue;
            }
            result = result[key];
        }

        return result;
    }

    // 设置嵌套属性
    static set(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;

        for (const key of keys) {
            if (!(key in current) || !this.isObject(current[key])) {
                current[key] = {};
            }
            current = current[key];
        }

        current[lastKey] = value;
        return obj;
    }

    // 对象转查询字符串
    static toQueryString(obj) {
        return Object.entries(obj)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    // 查询字符串转对象
    static fromQueryString(queryString) {
        const params = new URLSearchParams(queryString);
        const obj = {};
        for (const [key, value] of params) {
            obj[key] = value;
        }
        return obj;
    }
}

// 浏览器工具类
class BrowserUtils {
    // 获取用户代理信息
    static getUserAgent() {
        const ua = navigator.userAgent;
        return {
            browser: this.getBrowserName(ua),
            version: this.getBrowserVersion(ua),
            os: this.getOperatingSystem(ua),
            isMobile: this.isMobile(),
            isTablet: this.isTablet()
        };
    }

    // 获取浏览器名称
    static getBrowserName(ua) {
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('Opera')) return 'Opera';
        return 'Unknown';
    }

    // 获取浏览器版本
    static getBrowserVersion(ua) {
        const match = ua.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/);
        return match ? match[2] : 'Unknown';
    }

    // 获取操作系统
    static getOperatingSystem(ua) {
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    // 检查是否为移动设备
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 检查是否为平板设备
    static isTablet() {
        return /iPad|Android|Tablet/i.test(navigator.userAgent) && !this.isMobile();
    }

    // 获取屏幕信息
    static getScreenInfo() {
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        };
    }

    // 获取视口信息
    static getViewportInfo() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };
    }

    // 复制到剪贴板
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }

    // 全屏API
    static requestFullscreen(element = document.documentElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // 退出全屏
    static exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // 检查是否全屏
    static isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    }
}

// 存储工具类
class StorageUtils {
    // localStorage 操作
    static setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('localStorage set error:', error);
            return false;
        }
    }

    static getLocal(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('localStorage get error:', error);
            return defaultValue;
        }
    }

    static removeLocal(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('localStorage remove error:', error);
            return false;
        }
    }

    static clearLocal() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('localStorage clear error:', error);
            return false;
        }
    }

    // sessionStorage 操作
    static setSession(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('sessionStorage set error:', error);
            return false;
        }
    }

    static getSession(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('sessionStorage get error:', error);
            return defaultValue;
        }
    }

    static removeSession(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('sessionStorage remove error:', error);
            return false;
        }
    }

    static clearSession() {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('sessionStorage clear error:', error);
            return false;
        }
    }

    // Cookie 操作
    static setCookie(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    static getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static removeCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

// 验证工具类
class ValidationUtils {
    // 邮箱验证
    static isEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // 手机号验证（中国）
    static isPhoneNumber(phone) {
        const regex = /^1[3-9]\d{9}$/;
        return regex.test(phone);
    }

    // 身份证验证（中国）
    static isIdCard(idCard) {
        const regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return regex.test(idCard);
    }

    // URL验证
    static isUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // IP地址验证
    static isIpAddress(ip) {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }

    // 密码强度验证
    static checkPasswordStrength(password) {
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(checks).filter(Boolean).length;
        let strength = 'weak';
        
        if (score >= 4) strength = 'strong';
        else if (score >= 3) strength = 'medium';

        return { checks, score, strength };
    }

    // 表单验证
    static validateForm(data, rules) {
        const errors = {};

        Object.entries(rules).forEach(([field, fieldRules]) => {
            const value = data[field];
            const fieldErrors = [];

            fieldRules.forEach(rule => {
                if (rule.required && (!value || value.toString().trim() === '')) {
                    fieldErrors.push(rule.message || `${field} 是必填项`);
                }

                if (value && rule.min && value.toString().length < rule.min) {
                    fieldErrors.push(rule.message || `${field} 长度不能少于 ${rule.min} 个字符`);
                }

                if (value && rule.max && value.toString().length > rule.max) {
                    fieldErrors.push(rule.message || `${field} 长度不能超过 ${rule.max} 个字符`);
                }

                if (value && rule.pattern && !rule.pattern.test(value)) {
                    fieldErrors.push(rule.message || `${field} 格式不正确`);
                }

                if (value && rule.validator && !rule.validator(value)) {
                    fieldErrors.push(rule.message || `${field} 验证失败`);
                }
            });

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// 事件总线
class EventBus {
    constructor() {
        this.events = {};
    }

    // 订阅事件
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // 取消订阅
    off(event, callback) {
        if (!this.events[event]) return;
        
        if (callback) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        } else {
            delete this.events[event];
        }
    }

    // 触发事件
    emit(event, data) {
        if (!this.events[event]) return;
        
        this.events[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('EventBus callback error:', error);
            }
        });
    }

    // 只订阅一次
    once(event, callback) {
        const onceCallback = (data) => {
            callback(data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
}

// 导出所有工具类
window.Utils = {
    DateTimeUtils,
    MathUtils,
    StringUtils,
    ArrayUtils,
    ObjectUtils,
    BrowserUtils,
    StorageUtils,
    ValidationUtils,
    EventBus
};

// 创建全局事件总线实例
window.eventBus = new EventBus();

console.log('工具类模块已加载完成');