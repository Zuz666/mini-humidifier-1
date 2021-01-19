import { ICON } from '../../const';

const ZHIMI_HUMIDIFIER_CA4 = () => ({
  power: {
    icon: ICON.POWER,
    type: 'button',
    hide: false,
    toggle_action: (state, entity) => {
      const service = state === 'on' ? 'turn_off' : 'turn_on';
      const options = { entity_id: entity.entity_id };
      return this.call_service('fan', service, options);
    },
  },
  target_humidity: {
    icon: ICON.HUMIDITY,
    unit: '%',
    min: 30,
    max: 80,
    step: 10,
    hide: false,
    hide_indicator: false,
    state: { attribute: 'target_humidity' },
    change_action: (selected, state, entity) => {
      const options = { entity_id: entity.entity_id, humidity: selected };
      return this.call_service('xiaomi_miio', 'fan_set_target_humidity', options);
    },
  },
  indicators: {
    depth: {
      icon: ICON.DEPTH,
      unit: '%',
      round: 0,
      order: 0,
      hide: false,
      source: { attribute: 'water_level' },
    },
    temperature: {
      icon: ICON.TEMPERATURE,
      unit: '°C',
      round: 1,
      order: 1,
      hide: false,
      source: { attribute: 'temperature' },
    },
    humidity: {
      icon: ICON.HUMIDITY,
      unit: '%',
      round: 1,
      order: 2,
      hide: false,
      source: { attribute: 'humidity' },
    },
    motor_speed: {
      icon: ICON.RPM,
      unit: 'rpm',
      round: 0,
      order: 3,
      hide: false,
      source: { attribute: 'motor_speed' },
    },
  },
  buttons: {
    dry: {
      icon: ICON.DRY,
      hide: false,
      order: 0,
      state: { attribute: 'dry', mapper: state => (state ? 'on' : 'off') },
      toggle_action: (state, entity) => {
        const service = state === 'on' ? 'fan_set_dry_off' : 'fan_set_dry_on';
        const options = { entity_id: entity.entity_id };
        return this.call_service('xiaomi_miio', service, options);
      },
    },
    mode: {
      icon: ICON.FAN,
      type: 'dropdown',
      hide: false,
      order: 1,
      source: {
        auto: 'auto',
        low: 'low',
        medium: 'medium',
        high: 'high',
      },
      active: (state, entity) => (entity.state !== 'off'),
      disabled: (state, entity) => (entity.attributes.depth === 0),
      state: { attribute: 'mode', mapper: state => (['auto', 'low', 'medium', 'high'][state]) },
      change_action: (selected, state, entity) => {
        const options = { entity_id: entity.entity_id, speed: selected };
        return this.call_service('fan', 'set_speed', options);
      },
    },
    led: {
      icon: ICON.LEDBUTTON,
      type: 'dropdown',
      hide: false,
      order: 2,
      active: state => (state !== 0 && state !== '0'),
      source: { 0: 'Off', 1: 'Dim', 2: 'Bright' },
      state: { attribute: 'led_brightness' },
      change_action: (selected, state, entity) => {
        const options = { entity_id: entity.entity_id, brightness: selected };
        return this.call_service('xiaomi_miio', 'fan_set_led_brightness', options);
      },
    },
    buzzer: {
      icon: ICON.BUZZER,
      hide: false,
      order: 3,
      state: { attribute: 'buzzer', mapper: state => (state ? 'on' : 'off') },
      toggle_action: (state, entity) => {
        const service = state === 'on' ? 'fan_set_buzzer_off' : 'fan_set_buzzer_on';
        const options = { entity_id: entity.entity_id };
        return this.call_service('xiaomi_miio', service, options);
      },
    },
    child_lock: {
      icon: ICON.CHILDLOCK,
      hide: false,
      order: 4,
      state: { attribute: 'child_lock', mapper: state => (state ? 'on' : 'off') },
      toggle_action: (state, entity) => {
        const service = state === 'on' ? 'fan_set_child_lock_off' : 'fan_set_child_lock_on';
        const options = { entity_id: entity.entity_id };
        return this.call_service('xiaomi_miio', service, options);
      },
    },
  },
});

export default ZHIMI_HUMIDIFIER_CA4;
