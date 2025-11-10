import bcrypt from 'bcrypt';
import { User, Concessionaria } from '../models/index.js';

const createCanutoConcessionaria = async () => {
  try {
    console.log('🔍 Verificando se a concessionária Canuto Motors já existe...');
    
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ 
      where: { email: 'canuto@canutomotors.com' } 
    });

    if (!existingUser) {
      console.log('🚗 Criando concessionária Canuto Motors...');
      
      // Criar usuário
      const hash = await bcrypt.hash('12345', 10);
      const user = await User.create({
        name: 'Canuto Motors',
        email: 'canuto@canutomotors.com',
        password: hash,
        role: 'concessionaria'
      });

      console.log('✅ Usuário criado com ID:', user.id);

      // Criar concessionária associada
      const concessionaria = await Concessionaria.create({
        user_id: user.id,
        nome: 'Canuto Motors',
        cnpj: '12.345.678/0001-95',
        telefone: '(11) 3456-7890',
        email_comercial: 'vendas@canutomotors.com',
        endereco: {
          rua: 'Avenida das Automóveis',
          numero: '1234',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567'
        }
      });

      console.log('✅ Concessionária criada com ID:', concessionaria.id);
      console.log('🎉 Concessionária Canuto Motors criada com sucesso!');
      console.log('📧 Email: canuto@canutomotors.com');
      console.log('🔑 Senha: 12345');
      console.log('👤 ID do Usuário:', user.id);
      console.log('🏢 ID da Concessionária:', concessionaria.id);
      
    } else {
      console.log('ℹ️ Concessionária Canuto Motors já existe no banco de dados');
      console.log('👤 ID do usuário existente:', existingUser.id);
      
      // Verificar se a concessionária existe para este usuário
      const existingConcessionaria = await Concessionaria.findOne({
        where: { user_id: existingUser.id }
      });
      
      if (existingConcessionaria) {
        console.log('🏢 Concessionária existente com ID:', existingConcessionaria.id);
      } else {
        console.log('⚠️ Usuário existe mas concessionária não foi encontrada. Criando concessionária...');
        
        // Criar concessionária para o usuário existente
        const concessionaria = await Concessionaria.create({
          user_id: existingUser.id,
          nome: 'Canuto Motors',
          cnpj: '12.345.678/0001-95',
          telefone: '(11) 3456-7890',
          email_comercial: 'vendas@canutomotors.com',
          endereco: {
            rua: 'Avenida das Automóveis',
            numero: '1234',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01234-567'
          }
        });
        
        console.log('✅ Concessionária criada com ID:', concessionaria.id);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao criar concessionária Canuto Motors:', error);
    console.error('Detalhes do erro:', error.message);
  }
};

export default createCanutoConcessionaria;