import React from "react";

import { InputCellRenderer } from "./styles";

interface GridInputState {
  value: string;
  initialValue: string;
  submitSuccess: boolean;
}

type GridInputProps = {
  value: string;
  inputType: "text" | "email" | "number";
  maskType: "currency" | "decimal";
  api: {
    stopEditing: () => void;
  };
  data: {
    [key: string]: any;
    newValue: any;
    oldValue: any;
  };
  gridAction: (data: any) => Promise<boolean>;
  propertyKey: string;
  validacoes: (value: string) => boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

/* https://stackoverflow.com/a/40946121/13381372 */
class GridInput extends React.Component<GridInputProps, GridInputState> {
  private input: HTMLInputElement = document.createElement("input");
  private availableMasks = {
    currency: "currency",
    decimal: "decimal",
  };
  /* Lista completa dos parametros no link abaixo:
   * https://www.ag-grid.com/javascript-grid-cell-editor/#cell-editors
   */
  constructor(props: GridInputProps) {
    super(props);
    this.state = {
      value: props.value,
      initialValue: props.value,
      submitSuccess: false,
    };

    this.onChangeListener = this.onChangeListener.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getInputType = this.getInputType.bind(this);

    this.availableMasks = {
      currency: "currency",
      decimal: "decimal",
    };
  }

  componentDidMount() {
    const self = this;
    this.input.addEventListener("keydown", (event: any) => {
      self.myOnKeyDown(event);
    });
  }

  componentWillUnmount(): void {
    this.input.removeEventListener("keydown", (event: any) =>
      this.myOnKeyDown(event)
    );
  }

  onChangeListener(e: React.ChangeEvent<HTMLInputElement>): void {
    const maskType = this.getMaskType();
    const newValue = e.target.value
      ? e.target.value.toUpperCase()
      : e.target.value;

    let formattedValue = newValue;

    if (maskType === this.availableMasks.currency) {
      formattedValue = this.maskCurrency(newValue);
    } else if (maskType === this.availableMasks.decimal) {
      formattedValue = this.maskDecimal(newValue);
    }

    this.setState({ value: formattedValue });
  }

  getInputType() {
    const { inputType } = this.props;
    const availableTypes = {
      text: "text",
      email: "email",
      number: "number",
    };
    return availableTypes[inputType] || availableTypes.text;
  }

  getMaskType() {
    const { maskType } = this.props;
    return this.availableMasks[maskType] || "";
  }

  getValue() {
    const { value: inputValue, submitSuccess } = this.state;
    const { value } = this.props;

    return submitSuccess
      ? this.maskCleaner(inputValue)
      : this.maskCleaner(value);
  }

  maskDecimal = (valor = "") => {
    valor = valor.replace(/^\D/, "").replace(/[^0-9.,]/g, "");
    return valor;
  };

  maskCurrency(valor: string = ""): string {
    let v = valor.replace(/\D/g, "");

    v = (Number(v) / 100).toFixed(2).toString();
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
  }

  /* remove a máscara e retorna o valor original do input */

  maskCleaner(
    valor: string | number | null | undefined
  ): string | number | null | undefined {
    const maskType = this.getMaskType();
    if (!valor) return valor;

    valor = valor.toString();
    if (maskType === this.availableMasks.currency) {
      const temp = valor.replace(".", "").replace(",", ".");
      return temp;
    }
    if (maskType === this.availableMasks.decimal) {
      const temp = valor.replace(",", ".");
      return temp;
    }
    return valor;
  }

  /* Se retornar true discarta a edição na grid ao sair do campo */
  // isCancelAfterEnd() {
  //   return false;
  // }

  async myOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    try {
      const ENTER_KEY = 13;
      const key = event.which || event.keyCode;
      const { validacoes, api, data, gridAction, propertyKey } = this.props as {
        validacoes: (value: string) => boolean;
        api: { stopEditing: () => void };
        data: { [key: string]: any };
        gridAction: (data: any) => Promise<boolean>;
        propertyKey: string;
      };
      let { value: inputValue }: any = this.state;
      const { initialValue } = this.state;

      inputValue = this.maskCleaner(inputValue);

      if (key === ENTER_KEY) {
        event.stopPropagation();

        if (validacoes(inputValue)) {
          data.newValue = inputValue;
          data.oldValue = initialValue;
          data[propertyKey] = inputValue;

          /* Executa a função que salva a alteração na API */
          const isSuccess = await gridAction(data);
          if (isSuccess) {
            this.setState({ submitSuccess: true });
            api.stopEditing();
          } else {
            data[propertyKey] = initialValue;
          }
        }
        // else {
        //   this.input.focus();
        // }
      }
    } catch (error) {
      // vazio
    }
  }

  render() {
    const inputType = this.getInputType();
    const { value } = this.state;

    return (
      <InputCellRenderer
        ref={(c) => {
          this.input = c!;
        }}
        className="ag-cell-edit-input"
        type={inputType}
        value={value}
        onChange={this.onChangeListener}
      />
    );
  }
}
export default GridInput;
