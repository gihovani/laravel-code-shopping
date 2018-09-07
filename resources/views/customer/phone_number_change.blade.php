@extends('layouts.app')

@section('content')
    <p id="result" class="text-center">Atualizando telefone...</p>
    <script type="text/javascript">
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var message;
            if (this.readyState === 4 && this.status === 204) {
                message = 'Telefone atualizado com sucesso!';
            } else {
                message = 'Não foi possível atualizar o telefone';
            }
            document.getElementById('result').innerText = message;
        }
        xhttp.open('PATCH', '/api/customers/phone_numbers/{{$token}}', true);
        xhttp.send();
    </script>
@endsection