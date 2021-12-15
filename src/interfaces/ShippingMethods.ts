interface MethodsSettingsRulesValuesConditions {
  max: number;
  min: number;
}

interface MethodsSettingsRulesValues {
  conditions: MethodsSettingsRulesValuesConditions[];
  cost_per_order: string;
}

interface MethodsSettingsRules {
  id: string;
  value: MethodsSettingsRulesValues[];
}

interface MethodSettings {
  method_rules: MethodsSettingsRules;
  title: string;
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
