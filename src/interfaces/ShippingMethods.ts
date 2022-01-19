interface MethodsSettingsRulesValuesConditions {
  max: number;
  min: number;
}

export interface MethodsSettingsRulesValues {
  conditions: MethodsSettingsRulesValuesConditions[];
  cost_per_order: string;
}

export interface MethodsSettingsRules {
  id: string;
  value: MethodsSettingsRulesValues[];
}

export interface MethodSettings {
  method_rules: MethodsSettingsRules;
  title: string;
  method_title: {
    default: string;
    description: string;
    id: string;
    label: string;
    placeholder: string;
    tip: string;
    type: string;
    value: string;
  };
}

export interface ShippingMethods {
  id: string;
  title: string;
  method_description: string;
  method_title: string;
  method_id: string;
  settings: MethodSettings;
}

export interface ShippingZone {
  id: number;
  name: string;
}
