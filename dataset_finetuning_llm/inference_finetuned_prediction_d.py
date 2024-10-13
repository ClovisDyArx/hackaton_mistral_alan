from mistral_inference.transformer import Transformer
from mistral_inference.generate import generate

from mistral_common.tokens.tokenizers.mistral import MistralTokenizer
from mistral_common.protocol.instruct.messages import UserMessage
from mistral_common.protocol.instruct.request import ChatCompletionRequest


tokenizer = MistralTokenizer.from_file("/home/admin/mistral_models/tekken.json")
model = Transformer.from_folder("/home/admin/mistral_models")
model.load_lora("/home/admin/mistral-finetune/run_dir/checkpoints/checkpoint_000300/consolidated/lora.safetensors")

prompt = "continuous_sneezing,shivering,chills,watering_from_eyes"

completion_request = ChatCompletionRequest(messages=[UserMessage(content=prompt)])

tokens = tokenizer.encode_chat_completion(completion_request).tokens

out_tokens, _ = generate([tokens], model, max_tokens=256, temperature=0.3, eos_id=tokenizer.instruct_tokenizer.tokenizer.eos_id)
result = tokenizer.instruct_tokenizer.tokenizer.decode(out_tokens[0])

print(result)
