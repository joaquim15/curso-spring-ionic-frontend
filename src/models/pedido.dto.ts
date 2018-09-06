import { RefDTO } from "./ref.dto";
import { pagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO{
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: pagamentoDTO;
    items: ItemPedidoDTO[];
}