/**
 * ContactFormValidator
 * ---------------------
 * Small rule-based validator kept as a class so validation rules can be
 * unit tested and reused (e.g. server-side) independent of the Vue form.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

interface Rule {
  field: keyof ContactFormData;
  test: (value: string) => boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ContactFormValidator {
  private readonly rules: Rule[] = [
    {
      field: "name",
      test: (v) => v.trim().length >= 2,
      message: "Please enter your name.",
    },
    {
      field: "email",
      test: (v) => EMAIL_PATTERN.test(v.trim()),
      message: "Please enter a valid email address.",
    },
    {
      field: "message",
      test: (v) => v.trim().length >= 10,
      message: "Message should be at least 10 characters.",
    },
  ];

  validate(data: ContactFormData): ValidationResult {
    const errors: ValidationResult["errors"] = {};

    for (const rule of this.rules) {
      if (!rule.test(data[rule.field] ?? "")) {
        errors[rule.field] = rule.message;
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }
}
